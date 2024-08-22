import useSWR from "swr";

import { listDocuments } from "~/lib/appwrite";
import { TAGS_KEY } from "~/lib/swr";

export function useTags() {
  const { data, isLoading, error } = useSWR(TAGS_KEY, () => {
    return listDocuments("tags");
  });

  const hasTags = (data && data.total > 0) ?? false;
  return { data, hasTags, isLoading, error };
}
