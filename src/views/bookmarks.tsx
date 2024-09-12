import { BookmarksList } from "~/components/bookmarks/list";
import { AddInput } from "~/components/common/add-input";
import { TagsList } from "~/components/tags/list";
import { FiltersProvider } from "~/contexts/filters-context";

export function BookmarksView() {
  return (
    <section className="flex flex-col gap-y-6">
      <div>
        <AddInput />
      </div>
      <FiltersProvider>
        <TagsList />
        <BookmarksList />
      </FiltersProvider>
    </section>
  );
}
