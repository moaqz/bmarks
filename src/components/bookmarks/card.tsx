import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

import { SERVICES, config } from "~/lib/appwrite";
import { BOOKMARKS_KEY } from "~/lib/swr";

interface Props {
  id: string;
  favicon: string | null;
  title: string;
  url: string;
}

const FALLBACK_FAVICON = "/vite.svg";

export function BookmarkCard(props: Props) {
  const {
    favicon,
    url,
    title: bookmarkTitle,
    id: documentId,
  } = props;
  const [editable, setEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(() => bookmarkTitle);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => setEditedTitle(event.target.value);
  const enableEditing = () => setEditable(true);
  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();
  const exitWithoutChanges = () => {
    setEditable(false);
    setEditedTitle(bookmarkTitle);
  };

  const handleOnDelete = () => {
    closeModal();

    const promise = SERVICES.databases.deleteDocument(
      config.databaseID,
      config.bookmarksCollectionID,
      documentId,
    );

    toast.promise(promise, {
      loading: "Deleting bookmark...",
      error: "Unable to delete bookmark, try again.",
      success() {
        mutate(BOOKMARKS_KEY);
        return "Bookmark deleted!";
      },
    });
  };

  const handleOnUpdate = () => {
    if (!editedTitle.trim() || editedTitle === bookmarkTitle) {
      exitWithoutChanges();
      return;
    }

    const promise = SERVICES.databases.updateDocument(
      config.databaseID,
      config.bookmarksCollectionID,
      documentId,
      { title: editedTitle },
    );

    toast.promise(promise, {
      loading: "Updating bookmark...",
      success() {
        mutate(BOOKMARKS_KEY);
        return "Bookmark updated!";
      },
      error() {
        exitWithoutChanges();
        return "Unable to update bookmark, try again.";
      },
    });
  };

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  useEffect(() => {
    if (!editable) {
      return;
    }

    const handleOnClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current
        && !inputRef.current.contains(event.target as Node)
      ) {
        exitWithoutChanges();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        exitWithoutChanges();
      }
      else if (event.code === "Enter") {
        setEditable(false);
        handleOnUpdate();
      }
    };

    /**
     * Delay to avoid immediately triggering the outside click handler.
     * This ensures that the focus event does not immediately deactivate editing mode.
     */
    const timeoutId = setTimeout(() => {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("click", handleOnClickOutside);
    }, 5);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleOnClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editable, handleOnUpdate, exitWithoutChanges]);

  return (
    <article className="gap-3 px-4 py-3 border border-gray-3 rounded bg-gray-2 grid grid-cols-2 sm:grid-cols-[auto_1fr_auto]">
      <div className="inline-flex items-center sm:order-1">
        <img
          src={favicon || FALLBACK_FAVICON}
          alt={bookmarkTitle}
          width={24}
          height={24}
        />
      </div>

      {
        editable
          ? (
              <div className="flex flex-col group gap-0.5 order-10 col-span-2 sm:order-2 sm:col-span-1">
                <input type="text" className="text-sm bg-transparent text-gray-12" value={editedTitle} onChange={handleTitleChange} ref={inputRef} />
                <p className="text-sm text-gray-11 truncate">{url}</p>
              </div>
            )
          : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="group flex flex-col gap-0.5 order-10 col-span-2 sm:order-2 sm:col-span-1"
              >
                <h2 className="text-gray-12 text-sm text-pretty line-clamp-3 group-hover:underline">{bookmarkTitle}</h2>
                <p className="text-sm text-gray-11 truncate">{url}</p>
              </a>
            )
      }

      <div className="inline-flex items-start gap-3 justify-end sm:order-3">
        <button type="button" className="bg-transparent text-gray-10 transition-colors hover:text-gray-11 p-1" aria-label="Edit bookmark" onClick={enableEditing}>
          <svg width="16" height="16">
            <use href="/icons/ui.svg#pencil-line" />
          </svg>
        </button>

        <button type="button" className="bg-transparent text-gray-10 transition-colors hover:text-gray-11 p-1" aria-label="Delete bookmark" onClick={openModal}>
          <svg width="16" height="16">
            <use href="/icons/ui.svg#trash" />
          </svg>
        </button>

        <dialog ref={dialogRef} className="w-full p-6 rounded bg-gray-2 border border-gray-3 max-w-lg text-inherit backdrop:bg-gray-2/80">
          <div className="text-center flex flex-col gap-y-3 mb-6">
            <h1 className="font-bold text-xl">Delete Bookmark!</h1>
            <p className="text-sm text-gray-11">
              Are you sure you want to delete
              {" "}
              <span className="text-blue-11">{bookmarkTitle}</span>
              ?
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button type="button" className="button-gray" onClick={closeModal}>Cancel</button>
            <button type="button" className="button" onClick={handleOnDelete}>Yes, delete it!</button>
          </div>
        </dialog>
      </div>
    </article>
  );
}
