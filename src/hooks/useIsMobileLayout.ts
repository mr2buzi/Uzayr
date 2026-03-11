import { useEffect, useState } from "react";

export function useIsMobileLayout(breakpoint = 900) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobileLayout, setIsMobileLayout] = useState(() =>
    window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateLayout = () => setIsMobileLayout(mediaQuery.matches);

    updateLayout();

    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, [query]);

  return isMobileLayout;
}
