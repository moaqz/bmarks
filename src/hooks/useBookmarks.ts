import { Query } from "appwrite";
import { useEffect } from "react";
import useSWR from "swr";

import { listDocuments } from "~/lib/appwrite";
import { BOOKMARKS_KEY } from "~/lib/swr";
import { useFilters } from "./useFilters";

const QUERIES = [Query.orderDesc("$createdAt")];

export function useBookmarks() {
  const { selectedTag } = useFilters();
  const { data, isLoading, mutate } = useSWR(BOOKMARKS_KEY, {
    fetcher: () =>
      listDocuments(
        "bookmarks",
        !selectedTag
          ? QUERIES
          : [...QUERIES, Query.equal("tag_id", selectedTag)],
      ),
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: selectedTag is needed
  useEffect(() => {
    mutate();
  }, [selectedTag, mutate]);

  const hasBookmarks = data ? data.total > 0 : false;
  return { data, hasBookmarks, isLoading };
}
