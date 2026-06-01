"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  AMBIENCE_FADE_MS,
  AMBIENCE_TARGET_VOLUME,
  createAmbienceAudio,
  fadeAmbienceVolume,
} from "@/lib/haunted-ambience-audio";
import {
  readAmbiencePreference,
  writeAmbiencePreference,
  type AmbiencePreference,
} from "@/lib/haunted-ambience-storage";

type HauntedAmbienceContextValue = {
  isPlaying: boolean;
  preference: AmbiencePreference | null;
  toggle: () => void;
  /** First tap/click inside the interactive map (not autoplay). */
  activateFromMapInteraction: () => void;
  toastVisible: boolean;
  dismissToast: () => void;
};

const HauntedAmbienceContext =
  createContext<HauntedAmbienceContextValue | null>(null);

export function HauntedAmbienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const onMapPage = pathname === "/map";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeCancelRef = useRef<(() => void) | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [preference, setPreference] = useState<AmbiencePreference | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPreference(readAmbiencePreference());
  }, []);

  useEffect(() => {
    if (!onMapPage) {
      fadeCancelRef.current?.();
      fadeCancelRef.current = null;
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        fadeCancelRef.current = fadeAmbienceVolume(
          audio,
          0,
          AMBIENCE_FADE_MS,
          () => {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
          }
        );
      }
    }
  }, [onMapPage]);

  useEffect(() => {
    return () => {
      fadeCancelRef.current?.();
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      audioRef.current?.pause();
    };
  }, []);

  const dismissToast = useCallback(() => {
    setToastVisible(false);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  }, []);

  const showActivatedToast = useCallback(() => {
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
      toastTimerRef.current = null;
    }, 3200);
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = createAmbienceAudio();
    }
    return audioRef.current;
  }, []);

  const startPlayback = useCallback(
    async (options?: { showToast?: boolean }) => {
      const audio = ensureAudio();
      if (!audio) return false;

      fadeCancelRef.current?.();
      fadeCancelRef.current = null;

      try {
        audio.volume = 0;
        await audio.play();
        setIsPlaying(true);
        fadeCancelRef.current = fadeAmbienceVolume(
          audio,
          AMBIENCE_TARGET_VOLUME,
          AMBIENCE_FADE_MS
        );
        if (options?.showToast) showActivatedToast();
        return true;
      } catch {
        setIsPlaying(false);
        return false;
      }
    },
    [ensureAudio, showActivatedToast]
  );

  const stopPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      setIsPlaying(false);
      return;
    }

    fadeCancelRef.current?.();
    fadeCancelRef.current = fadeAmbienceVolume(
      audio,
      0,
      AMBIENCE_FADE_MS,
      () => {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    );
  }, []);

  const setPref = useCallback((value: AmbiencePreference) => {
    writeAmbiencePreference(value);
    setPreference(value);
  }, []);

  const activateFromMapInteraction = useCallback(() => {
    if (!onMapPage) return;
    const pref = readAmbiencePreference();
    if (pref === "soundOff") return;
    if (isPlaying) return;

    if (pref === "soundOn") {
      void startPlayback();
      return;
    }

    void startPlayback({ showToast: true }).then((ok) => {
      if (ok) setPref("soundOn");
    });
  }, [onMapPage, isPlaying, startPlayback, setPref]);

  const toggle = useCallback(() => {
    if (!onMapPage) return;

    if (isPlaying) {
      stopPlayback();
      setPref("soundOff");
      dismissToast();
      return;
    }

    const pref = readAmbiencePreference();
    if (pref === "soundOff" || pref === null || pref === "soundOn") {
      void startPlayback().then((ok) => {
        if (ok) setPref("soundOn");
      });
    }
  }, [
    onMapPage,
    isPlaying,
    stopPlayback,
    startPlayback,
    setPref,
    dismissToast,
  ]);

  const value: HauntedAmbienceContextValue = {
    isPlaying,
    preference,
    toggle,
    activateFromMapInteraction,
    toastVisible,
    dismissToast,
  };

  return (
    <HauntedAmbienceContext.Provider value={value}>
      {children}
    </HauntedAmbienceContext.Provider>
  );
}

export function useHauntedAmbience(): HauntedAmbienceContextValue | null {
  return useContext(HauntedAmbienceContext);
}
