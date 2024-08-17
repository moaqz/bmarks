import useSWR from "swr";
import { Query } from "appwrite";
import { useEffect } from "react";

import { useFilters } from "./useFilters";
import { BOOKMARKS_KEY } from "~/lib/swr";
import { SERVICES, config } from "~/lib/appwrite";

const QUERIES = [
  Query.orderDesc("$createdAt"),
  Query.limit(50),
];

export function useBookmarks() {
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

  const hasBookmarks = data ? data.total > 0 : false;
  return { data, hasBookmarks, isLoading };
}
