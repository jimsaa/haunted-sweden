import { NextResponse } from "next/server";
import {
  LOGIN_ERROR_INVALID,
  LOGIN_ERROR_RATE_LIMIT,
} from "@/lib/admin/messages";
import {
  clearLoginFailures,
  getLoginRateState,
  recordLoginFailure,
} from "@/lib/admin/rate-limit";
import {
  getClientIp,
  getCountryCode,
} from "@/lib/admin/request-context";
import { logSecurityEvent } from "@/lib/admin/security-log";
import { createAdminSessionToken } from "@/lib/admin/session-token";
import { shouldSkipTurnstile, verifyTurnstileToken } from "@/lib/admin/turnstile";
import { toPublicUser } from "@/lib/admin/users-types";
import { findAdminUserByCredentials } from "@/lib/admin/users-store";

type LoginBody = {
  username?: string;
  password?: string;
  turnstileToken?: string;
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const country = getCountryCode(request);
  const path = "/api/admin/login";

  try {
    const { record, blocked, requireCaptcha } = await getLoginRateState(ip);

    if (blocked) {
      logSecurityEvent({
        type: "rate_limited",
        ip,
        country,
        path,
        reason: "login_blocked_30min",
      });
      return NextResponse.json(
        {
          error: LOGIN_ERROR_RATE_LIMIT,
          requireCaptcha: true,
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as LoginBody;
    const username = body.username?.trim() ?? "";
    const password = body.password ?? "";

    const captchaNeeded = requireCaptcha && !shouldSkipTurnstile();

    if (captchaNeeded) {
      const captchaOk = await verifyTurnstileToken(body.turnstileToken, ip);
      if (!captchaOk) {
        logSecurityEvent({
          type: "captcha_failed",
          ip,
          country,
          username: username || undefined,
          path,
          reason: "turnstile_invalid",
        });
        return NextResponse.json(
          {
            error: LOGIN_ERROR_INVALID,
            requireCaptcha: true,
          },
          { status: 401 }
        );
      }
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: LOGIN_ERROR_INVALID, requireCaptcha: captchaNeeded },
        { status: 401 }
      );
    }

    const user = await findAdminUserByCredentials(username, password);
    if (!user) {
      const afterFail = await recordLoginFailure(ip);
      logSecurityEvent({
        type: "login_failed",
        ip,
        country,
        username,
        path,
        reason: "invalid_credentials",
      });

      if (afterFail.blocked) {
        logSecurityEvent({
          type: "login_blocked",
          ip,
          country,
          username,
          path,
          reason: "too_many_failures",
        });
        return NextResponse.json(
          {
            error: LOGIN_ERROR_RATE_LIMIT,
            requireCaptcha: true,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: LOGIN_ERROR_INVALID,
          requireCaptcha: afterFail.requireCaptcha,
        },
        { status: 401 }
      );
    }

    await clearLoginFailures(ip);

    const { token, expiresAt } = createAdminSessionToken(user.id, user.username);

    logSecurityEvent({
      type: "login_success",
      ip,
      country,
      username: user.username,
      path,
      reason: "ok",
    });

    return NextResponse.json({
      user: toPublicUser(user),
      sessionToken: token,
      expiresAt,
    });
  } catch (err) {
    console.error("[admin/login]", err);
    return NextResponse.json({ error: LOGIN_ERROR_INVALID }, { status: 500 });
  }
}
