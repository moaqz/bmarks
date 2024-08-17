import useSWR from "swr";
import { Query } from "appwrite";
import { useEffect } from "react";

import { BookmarkCard } from "./card";
import { BookmarkCardSkeleton } from "./card-skeleton";
import { BOOKMARKS_KEY } from "~/lib/swr";
import { SERVICES, config } from "~/lib/appwrite";
import { useFilters } from "~/hooks/useFilters";
import type { Bookmark } from "~/types/bookmark";

const QUERIES = [
  Query.orderDesc("$createdAt"),
];

export function BookmarksList() {
  const { selectedTag } = useFilters();
  const { data, isLoading, mutate } = useSWR(BOOKMARKS_KEY, {
    fetcher: () => SERVICES.databases.listDocuments(
      config.databaseID,
      config.bookmarksCollectionID,
      !selectedTag ? QUERIES : [...QUERIES, Query.equal("tag_id", selectedTag)],
    ),
  });

  useEffect(() => {
    mutate();
  }, [selectedTag, mutate]);

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

  const hasBookmarks = data.total > 0;

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
