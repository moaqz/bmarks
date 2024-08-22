import { toast } from "sonner";
import { mutate } from "swr";
import type { ClipboardEvent } from "react";
import { useState } from "react";

import { useForm } from "~/hooks/useForm";
import { isValidHttpURL } from "~/lib/url";
import { createDocument } from "~/lib/appwrite";
import { BOOKMARKS_KEY, TAGS_KEY } from "~/lib/swr";
import type { MetadataAPIResponse } from "~/types/metadata";

/**
 * https://github.com/moaqz/webmeta
 */
const METADATA_ENDPOINT = "https://webmeta.moaqz.workers.dev";

export function AddInput() {
  const [isLoading, setIsLoading] = useState(false);
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
      favicon_url: isValidHttpURL(metadata.favicon) ? metadata.favicon : null,
      url,
      title: metadata.title,
    };

    createDocument("bookmarks", payload)
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
    createDocument("tags", { name })
      .then(() => {
        toast.success("Tag created");
        mutate(TAGS_KEY);
        resetForm();
      })
      .catch(() => {
        toast.error("Unable to create tag. Try again later.");
      });
  };

  const handleOnPaste = async (event: ClipboardEvent<HTMLInputElement>) => {
    const _input = event.clipboardData.getData("text");
    if (isValidHttpURL(_input)) {
      setIsLoading(true);
      await createBookmark(_input).finally(() => setIsLoading(false));
    }
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

  const loading = isSubmitting || isLoading;

  return (
    <form onSubmit={async (event) => {
      event.preventDefault();
      await handleSubmit(onSubmit);
    }}
    >
      <div className="flex items-center relative">
        <div className="absolute left-3 text-gray-9">
          <svg width="24" height="24" className={loading ? "animate-spin" : undefined}>
            <use href={`/icons/ui.svg#${loading ? "loader-circle" : "plus"}`} />
          </svg>
        </div>

        <input
          type="text"
          className="text-gray-11 w-full bg-gray-2 border border-gray-3 rounded h-12 px-12 focus:outline-2 focus:outline focus:outline-offset-2 focus:outline-blue-8"
          placeholder="Enter a link or tag..."
          name="value"
          value={data.value}
          onChange={handleChange}
          onPaste={handleOnPaste}
          disabled={loading}
        />
      </div>
    </form>
  );
}
