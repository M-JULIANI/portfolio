import { useEffect } from "react";

interface KeyboardNavigationOptions {
  itemPrefix: string;
  items: any[];
  onEnter?: (currentIndex: number) => void;
  onEscape?: () => void;
  getColumnCount: () => number;
}

export const useKeyboardNavigation = ({
  itemPrefix,
  items,
  onEnter,
  onEscape,
  getColumnCount,
}: KeyboardNavigationOptions) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const focusedId = document.activeElement?.id;
    if (!focusedId?.startsWith(itemPrefix) || !items) return;

    const currentIndex = items.findIndex((p) => `${itemPrefix}${p.id}` === focusedId);
    if (currentIndex === -1) return;

    const cols = getColumnCount();
    let nextIndex: number | null = null;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : null;
        break;
      case "ArrowLeft":
        nextIndex = currentIndex > 0 ? currentIndex - 1 : null;
        break;
      case "ArrowDown":
        nextIndex = currentIndex + cols < items.length ? currentIndex + cols : null;
        break;
      case "ArrowUp":
        nextIndex = currentIndex - cols >= 0 ? currentIndex - cols : null;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onEnter?.(currentIndex);
        return;
      case "Escape":
        e.preventDefault();
        onEscape?.();
        return;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      document.getElementById(`${itemPrefix}${items[nextIndex].id}`)?.focus();
    }
  };

  //initialize focus on first item
  useEffect(() => {
    if (items && items.length > 0) {
      document.getElementById(`${itemPrefix}${items[0].id}`)?.focus();
    }
  }, [items, itemPrefix]);

  return { handleKeyDown };
};
