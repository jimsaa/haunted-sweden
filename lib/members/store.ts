import { randomBytes } from "crypto";
import { hashPassword, verifyPassword } from "@/lib/members/password";
import {
  readMembersStoreJson,
  writeMembersStoreJson,
} from "@/lib/members/storage";
import {
  emptyMemberStats,
  toPublicMember,
  type MemberProfile,
  type MembersFile,
  type MemberPublicProfile,
} from "@/lib/members/types";

const EMPTY: MembersFile = { users: [] };

/** Development-only seeded administrator. Never auto-seed in production. */
const DEV_ADMIN_USERNAME = "admin";
const DEV_ADMIN_PASSWORD = "haunted7394";

function newId(): string {
  return `mem_${randomBytes(8).toString("hex")}`;
}

async function ensureDevAdmin(file: MembersFile): Promise<MembersFile> {
  if (process.env.NODE_ENV === "production") return file;

  const existing = file.users.find(
    (u) => u.username.toLowerCase() === DEV_ADMIN_USERNAME
  );
  if (existing) return file;

  const now = new Date().toISOString();
  const admin: MemberProfile = {
    id: newId(),
    username: DEV_ADMIN_USERNAME,
    email: "admin@localhost.dev",
    passwordHash: hashPassword(DEV_ADMIN_PASSWORD),
    displayName: "Administrator",
    biography: "Local development administrator account.",
    country: "Sweden",
    avatarUrl: null,
    tier: "administrator",
    role: "administrator",
    badges: [
      { badgeId: "administrator", unlockedAt: now, source: "system" },
      { badgeId: "founder", unlockedAt: now, source: "system" },
    ],
    booksOwned: ["book1"],
    placesVisited: [],
    stats: { ...emptyMemberStats(), badgesUnlocked: 2, booksRead: 1 },
    createdAt: now,
    updatedAt: now,
    enabled: true,
  };

  const next = { users: [...file.users, admin], updatedAt: now };
  await writeMembersStoreJson(next);
  console.log(
    "[members] Seeded development administrator (admin / haunted7394)"
  );
  return next;
}

export async function readMembersFile(): Promise<MembersFile> {
  const file = await readMembersStoreJson<MembersFile>(EMPTY);
  if (!Array.isArray(file.users)) {
    return ensureDevAdmin({ users: [] });
  }
  return ensureDevAdmin(file);
}

async function writeMembersFile(file: MembersFile): Promise<void> {
  await writeMembersStoreJson({
    updatedAt: new Date().toISOString(),
    users: file.users,
  });
}

export async function findMemberByUsername(
  username: string
): Promise<MemberProfile | null> {
  const file = await readMembersFile();
  const normalized = username.trim().toLowerCase();
  return (
    file.users.find((u) => u.username.trim().toLowerCase() === normalized) ??
    null
  );
}

export async function findMemberByEmail(
  email: string
): Promise<MemberProfile | null> {
  const file = await readMembersFile();
  const normalized = email.trim().toLowerCase();
  return (
    file.users.find((u) => u.email.trim().toLowerCase() === normalized) ?? null
  );
}

export async function findMemberById(
  id: string
): Promise<MemberProfile | null> {
  const file = await readMembersFile();
  return file.users.find((u) => u.id === id) ?? null;
}

export async function authenticateMember(
  usernameOrEmail: string,
  password: string
): Promise<MemberProfile | null> {
  const file = await readMembersFile();
  const key = usernameOrEmail.trim().toLowerCase();
  const user = file.users.find(
    (u) =>
      u.username.trim().toLowerCase() === key ||
      u.email.trim().toLowerCase() === key
  );
  if (!user || !user.enabled) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;
  return user;
}

export type RegisterMemberInput = {
  username: string;
  email: string;
  password: string;
  displayName?: string;
  country?: string;
};

export async function registerMember(
  input: RegisterMemberInput
): Promise<
  { ok: true; user: MemberPublicProfile } | { ok: false; error: string }
> {
  const username = input.username.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) {
    return {
      ok: false,
      error: "Username must be 3–24 characters (letters, numbers, underscore).",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  const file = await readMembersFile();
  if (
    file.users.some((u) => u.username.toLowerCase() === username.toLowerCase())
  ) {
    return { ok: false, error: "Username is already taken." };
  }
  if (file.users.some((u) => u.email.toLowerCase() === email)) {
    return { ok: false, error: "Email is already registered." };
  }

  const now = new Date().toISOString();
  const user: MemberProfile = {
    id: newId(),
    username,
    email,
    passwordHash: hashPassword(password),
    displayName: input.displayName?.trim() || username,
    biography: "",
    country: input.country?.trim() || "",
    avatarUrl: null,
    tier: "free",
    role: "member",
    badges: [
      { badgeId: "community-member", unlockedAt: now, source: "system" },
    ],
    booksOwned: [],
    placesVisited: [],
    stats: { ...emptyMemberStats(), badgesUnlocked: 1 },
    createdAt: now,
    updatedAt: now,
    enabled: true,
  };

  file.users.push(user);
  await writeMembersFile(file);
  return { ok: true, user: toPublicMember(user) };
}

export async function updateMemberProfile(
  id: string,
  patch: Partial<
    Pick<MemberProfile, "displayName" | "biography" | "country" | "avatarUrl">
  >
): Promise<MemberPublicProfile | null> {
  const file = await readMembersFile();
  const idx = file.users.findIndex((u) => u.id === id);
  if (idx < 0) return null;
  const current = file.users[idx]!;
  file.users[idx] = {
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await writeMembersFile(file);
  return toPublicMember(file.users[idx]!);
}

export async function listMembersPublic(): Promise<MemberPublicProfile[]> {
  const file = await readMembersFile();
  return file.users.map(toPublicMember);
}
