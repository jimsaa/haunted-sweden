"use client";

import { useEffect, useState } from "react";

/** True after the first client effect — safe to show locale-specific UI. */
export function useClientMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
