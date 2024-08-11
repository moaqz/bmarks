import { Query } from "appwrite";
import useSWR from "swr";

import { AddInput } from "~/components/common/add-input";
import { BookmarkCard } from "~/components/bookmarks/card";
import { BookmarkCardSkeleton } from "~/components/bookmarks/card-skeleton";
import { SERVICES, config } from "~/lib/appwrite";
import { BOOKMARKS_KEY } from "~/lib/swr";

export function BookmarksView() {
  const { data, isLoading } = useSWR(BOOKMARKS_KEY, {
    fetcher: () => SERVICES.databases.listDocuments(
      config.databaseID,
      config.bookmarksCollectionID,
      [Query.orderDesc("$createdAt")],
    ),
  });

  if (isLoading && !data) {
    return (
      <section className="flex flex-col gap-y-6">
        <div>
          <AddInput />
        </div>

        <ul className="flex flex-col gap-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <BookmarkCardSkeleton />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const hasBookmarks = data.total > 0;

  return (
    <section className="flex flex-col gap-y-6">
      <div>
        <AddInput />
      </div>

      <ul className="flex flex-col gap-y-3">
        {hasBookmarks
          ? data.documents.map((bookmark: any) => {
            return (
              <li key={bookmark.$id}>
                <BookmarkCard
                  favicon={bookmark.favicon_url}
                  id={bookmark.$id}
                  title={bookmark.title}
                  url={bookmark.url}
                />
              </li>
            );
          })
          : (
              <div className="flex flex-col gap-y-3 p-6 justify-center items-center border border-dashed border-gray-3 rounded bg-gray-2">
                <svg width="32" height="32">
                  <use href="/icons/ui.svg#bookmark" />
                </svg>

                <div className="flex flex-col max-w-sm text-center gap-y-1">
                  <p className="font-bold">No bookmarks found!</p>
                  <p className="text-center text-gray-11 text-sm">
                    You haven't added any bookmarks yet. Use the input above to start saving your favorite websites.
                  </p>
                </div>
              </div>
            )}
      </ul>
    </section>
  );
}
