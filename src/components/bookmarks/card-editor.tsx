import { useEffect, useRef, useState } from "react";
import type { Bookmark } from "~/types/bookmark";

interface Props {
  enabled: boolean;
  bookmark: Bookmark;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
}

export function BookmarkCardEditor(props: Props) {
  const {
    bookmark,
    enabled,
    onCancel,
    onSave,
  } = props;
  const [title, setTitle] = useState(() => bookmark.title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (enabled) {
      inputRef.current?.focus();
    }
  }, [enabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    if (enabled) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enabled, onCancel]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSave(title);
    }
    else if (event.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div ref={wrapperRef} className="flex flex-col group gap-0.5 order-10 col-span-2 sm:order-2 sm:col-span-1">
      <input
        type="text"
        className="text-sm bg-transparent text-gray-12"
        value={title}
        onChange={handleTitleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <p className="text-sm text-gray-11 truncate">{bookmark.url}</p>
    </div>
  );
}
