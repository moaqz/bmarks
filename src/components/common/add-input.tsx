import { toast } from "sonner";
import { mutate } from "swr";
import { ID } from "appwrite";

import { useForm } from "~/hooks/useForm";
import { isValidHttpURL } from "~/lib/url";
import { SERVICES, config } from "~/lib/appwrite";
import { BOOKMARKS_KEY, TAGS_KEY } from "~/lib/swr";
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
    value: "",
  });

  const createBookmark = async (url: string) => {
    const res = await fetch(`${METADATA_ENDPOINT}?from=${url}`);
    const { data: metadata }: MetadataAPIResponse = await res.json();

    const payload = {
      favicon_url: metadata.favicon || null,
      url,
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

  const createTag = async (name: string) => {
    SERVICES.databases.createDocument(
      config.databaseID,
      config.tagsCollectionID,
      ID.unique(),
      { name },
    )
      .then(() => {
        toast.success("Tag created");
        mutate(TAGS_KEY);
        resetForm();
      })
      .catch(() => {
        toast.error("Unable to create tag. Try again later.");
      });
  };

  const onSubmit = async ({ value }: { value: string }) => {
    if (!value) {
      return;
    }

    if (value.startsWith("tag:")) {
      const tagName = value.slice(4).trim();
      if (tagName) {
        await createTag(tagName);
      }
    }
    else if (isValidHttpURL(value)) {
      await createBookmark(value);
    }
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
          type="text"
          className="text-gray-11 w-full bg-gray-2 border border-gray-3 rounded h-12 px-12 focus:outline-2 focus:outline focus:outline-offset-2 focus:outline-blue-8"
          placeholder="Enter a link or tag..."
          name="value"
          value={data.value}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
