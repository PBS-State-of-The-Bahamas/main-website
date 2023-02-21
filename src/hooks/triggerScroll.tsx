import { useEffect } from "react";

export function useTriggerScrollFix(deps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("scroll"));
    }
  }, deps);
}
