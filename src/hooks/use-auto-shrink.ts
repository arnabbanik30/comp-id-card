import { useEffect, useRef, useState } from 'react';

export function useAutoShrink<
  TContainer extends HTMLElement,
  THeading extends HTMLElement,
>(text: string, maxSize: number, minSize: number, step: number = 2) {
  const containerRef = useRef<TContainer>(null);
  const textRef = useRef<THeading>(null);
  const [fontSize, setFontSize] = useState(maxSize);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) {
      return;
    }

    let size = maxSize;
    textEl.style.fontSize = `${size}px`;

    while (container.scrollHeight > container.clientHeight && size > minSize) {
      size -= step;
      textEl.style.fontSize = `${size}px`;
    }

    setFontSize(size);
  }, [text, maxSize, minSize, step]);

  return { containerRef, textRef, fontSize };
}
