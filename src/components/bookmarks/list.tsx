import { BookmarkCard } from "./card";
import { BookmarkCardSkeleton } from "./card-skeleton";
import type { Bookmark } from "~/types/collections";
import { useBookmarks } from "~/hooks/useBookmarks";

export function BookmarksList() {
  const { data, isLoading, hasBookmarks } = useBookmarks();

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <BookmarkCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-y-3">
      {hasBookmarks
        ? data.documents.map((bookmark: Bookmark) => {
          return (
            <li key={bookmark.$id}>
              <BookmarkCard data={bookmark} />
            </li>
          );
        })
        : (
            <div className="flex flex-col gap-y-3 justify-center items-center border border-gray-3 rounded bg-gray-2 p-6 border-dashed">
              <svg width="32" height="32">
                <use href="/icons/ui.svg#bookmark" />
              </svg>

              <div className="flex flex-col text-center max-w-sm gap-y-1">
                <p className="font-bold">No bookmarks found!</p>
                <p className="text-center text-gray-11 text-sm">
                  You haven't added any bookmarks yet. Use the input above to start saving your favorite websites.
                </p>
              </div>
            </div>
          )}
    </ul>
  );
}
