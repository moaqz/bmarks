import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

import { DeleteBookmarkModal } from "./delete-bookmark-modal";
import { BookmarkCardEditor } from "./card-editor";
import { TagSelector } from "~/components/tags/tag-selector";
import { deleteDocument, updateDocument } from "~/lib/appwrite";
import { BOOKMARKS_KEY } from "~/lib/swr";
import type { Bookmark, Tag } from "~/types/collections";

interface Props {
  data: Bookmark;
}

const FALLBACK_FAVICON = import.meta.env.VITE_FALLBACK_ICON;

export function BookmarkCard(props: Props) {
  const { data: bookmark } = props;
  const [editable, setEditable] = useState(false);
  const [deleteBookmarkModalOpen, setDeleteBookmarkModal] = useState(false);
  const [tagSelectorModalOpen, setTagSelectorMenu] = useState(false);

  const handleOnDelete = () => {
    return deleteDocument("bookmarks", bookmark.$id);
  };

  const handleOnUpdate = (newTitle: string) => {
    if (!newTitle.trim() || newTitle === bookmark.title) {
      setEditable(false);
      return;
    }

    const promise = updateDocument("bookmarks", bookmark.$id, {
      title: newTitle,
    });

    toast.promise(promise, {
      loading: "Updating bookmark...",
      success() {
        setEditable(false);
        mutate(BOOKMARKS_KEY);
        return "Bookmark updated!";
      },
      error() {
        setEditable(false);
        return "Unable to update bookmark, try again.";
      },
    });
  };

  const handleOnTagSelect = (selectedTag: Tag | null) => {
    return updateDocument("bookmarks", bookmark.$id, {
      tag_id: selectedTag ? selectedTag.$id : null,
    });
  };

  const ACTIONS = [
    {
      title: "Edit bookmark",
      icon: "pencil-line",
      action: () => setEditable(true),
    },
    {
      title: "Delete bookmark",
      icon: "trash",
      action: () => setDeleteBookmarkModal(true),
    },
    {
      title: "Attach tag",
      icon: "tag",
      action: () => setTagSelectorMenu(true),
    },
  ];

  return (
    <article className="gap-3 px-4 py-3 border border-gray-3 rounded bg-gray-2 grid grid-cols-2 sm:grid-cols-[auto_1fr_auto]">
      <div className="inline-flex items-center size-6 sm:order-1">
        <img
          src={bookmark.favicon_url || FALLBACK_FAVICON}
          alt={bookmark.title}
          width={24}
          height={24}
        />
      </div>

      {
        editable
          ? (
              <BookmarkCardEditor
                onSave={handleOnUpdate}
                onCancel={() => setEditable(false)}
                enabled={editable}
                bookmark={bookmark}
              />
            )
          : (
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="group flex flex-col gap-0.5 order-10 col-span-2 sm:order-2 sm:col-span-1 sm:max-w-90"
              >
                <h2 className="text-gray-12 text-sm line-clamp-3 break-words group-hover:underline">{bookmark.title}</h2>
                <p className="text-sm text-gray-11 truncate">{bookmark.url}</p>
              </a>
            )
      }

      <div className="inline-flex items-start gap-3 justify-end sm:order-3">
        {ACTIONS.map(({ action, icon, title }) => {
          return (
            <button
              key={title}
              type="button"
              className="bg-transparent text-gray-10 transition-colors hover:text-gray-11 p-1"
              title={title}
              onClick={action}
            >
              <svg width="16" height="16">
                <use href={`/icons/ui.svg#${icon}`} />
              </svg>
            </button>
          );
        })}

        {deleteBookmarkModalOpen
          ? (
              <DeleteBookmarkModal
                isOpen={deleteBookmarkModalOpen}
                handleClose={() => setDeleteBookmarkModal(false)}
                onSubmit={handleOnDelete}
                bookmark={bookmark}
              />
            )
          : null}

        {tagSelectorModalOpen
          ? (
              <TagSelector
                defaultValue={bookmark.tag_id}
                isOpen={tagSelectorModalOpen}
                handleClose={() => setTagSelectorMenu(false)}
                onSubmit={handleOnTagSelect}
              />
            )
          : null}
      </div>
    </article>
  );
}
