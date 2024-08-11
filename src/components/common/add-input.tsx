import { toast } from "sonner";
import { mutate } from "swr";

import { useForm } from "~/hooks/useForm";
import { SERVICES, config } from "~/lib/appwrite";
import { BOOKMARKS_KEY } from "~/lib/swr";
import type { MetadataAPIResponse } from "~/types/metadata";

/**
 * https://github.com/moaqz/webmeta
 */
const METADATA_ENDPOINT = "https://webmeta.moaqz.workers.dev";

export function AddInput() {
  const {
    data,
    handleSubmit,
    handleChange,
    isSubmitting,
    resetForm,
  } = useForm({
    url: "",
  });

  const onSubmit = async (data: { url: string }) => {
    if (!data.url) {
      return;
    }

    const res = await fetch(`${METADATA_ENDPOINT}?from=${data.url}`);
    const { data: metadata }: MetadataAPIResponse = await res.json();

    const payload = {
      favicon_url: metadata.favicon || null,
      url: data.url,
      title: metadata.title,
    };

    SERVICES.databases.createDocument(
      config.databaseID,
      config.bookmarksCollectionID,
      SERVICES.id.unique(),
      payload,
    )
      .then(() => {
        toast.success("Bookmark created");
        mutate(BOOKMARKS_KEY);
        resetForm();
      })
      .catch(() => {
        toast.error("Unable to create bookmark. Try again later.");
      });
  };

  return (
    <form onSubmit={async (event) => {
      event.preventDefault();
      await handleSubmit(onSubmit);
    }}
    >
      <div className="flex items-center relative">
        <div className="absolute left-3 text-gray-9">
          <svg width="24" height="24" className={isSubmitting ? "animate-spin" : undefined}>
            <use href={`/icons/ui.svg#${isSubmitting ? "loader-circle" : "plus"}`} />
          </svg>
        </div>

        <input
          type="url"
          className="text-gray-11 w-full bg-gray-2 border border-gray-3 rounded h-12 px-12 focus:outline-2 focus:outline focus:outline-offset-2 focus:outline-blue-8"
          placeholder="Insert a link..."
          name="url"
          value={data.url}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
