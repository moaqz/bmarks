import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

import { Modal } from "~/components/common/modal";
import { BOOKMARKS_KEY } from "~/lib/swr";
import type { Bookmark } from "~/types/bookmark";

interface Props {
  isOpen: boolean;
  bookmark: Bookmark;
  handleClose: () => void;
  onSubmit: () => Promise<void | object>;
};

export function DeleteBookmarkModal(props: Props) {
  const { bookmark, isOpen, handleClose, onSubmit } = props;
  const [isDeleting, setIsDeleting] = useState(false);

  const onClose = () => {
    setIsDeleting(false);
    handleClose();
  };

  const handleBookmarkDelete = async () => {
    setIsDeleting(true);

    await onSubmit()
      .then(() => {
        toast.success("Bookmark deleted!");
        mutate(BOOKMARKS_KEY);
      })
      .catch(() => {
        toast.error("Unable to delete bookmark, try again.");
      })
      .finally(onClose);
  };

  return (
    <Modal title="Delete Bookmark" isOpen={isOpen} handleClose={onClose}>
      <p className="text-sm text-gray-11 text-center">
        Are you sure you want to delete
        {" "}
        <span className="text-blue-11">{bookmark.title}</span>
        ?
      </p>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button type="button" className="button-gray" onClick={onClose}>
          Cancel
        </button>

        <button type="button" className="button" onClick={handleBookmarkDelete} disabled={isDeleting}>
          {isDeleting
            ? (
                <>
                  <svg width="24" height="24" className="animate-spin">
                    <use href="/icons/ui.svg#loader-circle" />
                  </svg>
                  <span>Deleting...</span>
                </>
              )
            : "Yes, delete it!"}
        </button>
      </div>
    </Modal>
  );
}
