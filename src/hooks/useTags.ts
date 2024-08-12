import useSWR from "swr";

import { SERVICES, config } from "~/lib/appwrite";
import { TAGS_KEY } from "~/lib/swr";

export function useTags() {
  const { data, isLoading, error } = useSWR(TAGS_KEY, () => {
    return SERVICES.databases.listDocuments(
      config.databaseID,
      config.tagsCollectionID,
    );
  });

  const hasTags = (data && data.total > 0) ?? false;
  return { data, hasTags, isLoading, error };
}
