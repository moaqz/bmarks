import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { toast } from "sonner";
import { mutate } from "swr";

import { Modal } from "~/components/common/modal";
import { useTags } from "~/hooks/useTags";
import type { Tag } from "~/types/collections";
import { BOOKMARKS_KEY } from "~/lib/swr";

interface Props {
  defaultValue: Tag | null;
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (selectedTag: Tag | null) => Promise<void | object>;
}

export function TagSelector(props: Props) {
  const {
    handleClose,
    isOpen,
    defaultValue,
    onSubmit,
  } = props;
  const { data, isLoading } = useTags();
  const [selectedTag, setSelectedTag] = useState<Tag | null>(() => defaultValue);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async () => {
    setIsUpdating(true);

    await onSubmit(selectedTag)
      .then(() => {
        toast.success("Tag successfully applied to the bookmark!");
        mutate(BOOKMARKS_KEY);
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again later.");
      })
      .finally(() => {
        handleClose();
        setIsUpdating(false);
      });
  };

  return (
    <Modal title="Apply tag" handleClose={handleClose} isOpen={isOpen}>
      <p className="text-sm text-balance text-gray-11 text-center">
        Select a tag to associate with this document. You can also remove the existing tag by selecting "None."
      </p>

      <div className="flex items-center justify-center mt-6">
        {isLoading
          ? (
              <svg width="24" height="24" className="animate-spin">
                <use href="/icons/ui.svg#loader-circle" />
              </svg>
            )
          : (
              <Listbox value={selectedTag} onChange={setSelectedTag}>
                <ListboxButton
                  className="bg-transparent border rounded font-medium text-sm focus:outline focus:outline-2 focus:outline-offset-2 w-60 h-10 border-gray-5 focus:outline-gray-8"
                >
                  {selectedTag ? selectedTag.name : "Select tag"}
                </ListboxButton>

                <ListboxOptions anchor="bottom" className="w-60 flex flex-col p-1 rounded bg-gray-2 border border-gray-5 max-h-60! overflow-y-scroll mt-1 outline-none">
                  {data?.documents.map(tag => (
                    <ListboxOption
                      key={tag.$id}
                      value={tag}
                      className="inline-flex items-center gap-3 px-4 text-gray-12 text-sm font-medium rounded-md py-2 hover:bg-gray-4 data-[focus]:bg-gray-4"
                    >
                      <svg width="16" height="16">
                        <use href="/icons/ui.svg#tag" />
                      </svg>
                      <span>{tag.name}</span>
                    </ListboxOption>
                  ))}

                  <ListboxOption
                    value={null}
                    className="inline-flex items-center gap-3 px-4 py-2 text-gray-12 text-sm font-medium rounded-md hover:bg-gray-4 data-[focus]:bg-gray-4"
                  >
                    <svg width="16" height="16">
                      <use href="/icons/ui.svg#tag" />
                    </svg>
                    <span>None</span>
                  </ListboxOption>
                </ListboxOptions>
              </Listbox>
            )}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button type="button" className="button-gray" onClick={handleClose}>
          Cancel
        </button>

        <button type="button" className="button" disabled={isUpdating} onClick={handleSubmit}>
          {isUpdating
            ? (
                <>
                  <svg width="24" height="24" className="animate-spin">
                    <use href="/icons/ui.svg#loader-circle" />
                  </svg>
                  <span>Updating...</span>
                </>
              )
            : "Yes, update it!"}
        </button>
      </div>
    </Modal>
  );
}
