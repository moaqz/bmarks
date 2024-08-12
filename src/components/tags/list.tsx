import { TagBadge } from "./badge";
import { TagBadgeSkeleton } from "./badge-skeleton";
import { useFilters } from "~/hooks/useFilters";
import { useTags } from "~/hooks/useTags";

export function TagsList() {
  const { selectedTag, updateSelectedTag } = useFilters();
  const { data, isLoading, hasTags } = useTags();

  if (isLoading) {
    return (
      <ul className="flex gap-3 flex-wrap">
        {Array
          .from({ length: 4 })
          .map((_, idx) => <TagBadgeSkeleton key={idx} />)}
      </ul>
    );
  }

  return (
    hasTags
      ? (
          <ul className="flex flex-wrap gap-3">
            {data?.documents.map((tag) => {
              return (
                <TagBadge
                  key={tag.$id}
                  onSelect={() => updateSelectedTag(tag.$id)}
                  selected={selectedTag === tag.$id}
                  id={tag.$id}
                  name={tag.name}
                />
              );
            })}
          </ul>
        )
      : null
  );
}
