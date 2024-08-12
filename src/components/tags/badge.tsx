import { useRef } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { SERVICES, config } from "~/lib/appwrite";
import { TAGS_KEY } from "~/lib/swr";

interface Props {
  id: string;
  name: string;
  selected: boolean;
  onSelect: () => void;
}

export function TagBadge(props: Props) {
  const { name, onSelect, selected, id } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleOnDelete = () => {
    closeModal();

    const promise = SERVICES.databases.deleteDocument(
      config.databaseID,
      config.tagsCollectionID,
      id,
    );

    toast.promise(promise, {
      loading: "Deleting tag...",
      error: "Unable to delete tag, try again.",
      success() {
        mutate(TAGS_KEY);
        onSelect();
        return "Tag deleted!";
      },
    });
  };

  return (
    <div className={`inline-flex items-center gap-1 select-none text-sm font-semibold bg-blue-3 text-blue-12 rounded transition-colors ${selected ? "bg-blue-7" : ""} hover:bg-blue-7`}>
      <span onClick={onSelect} className="px-2 py-1">
        {name}
      </span>

      <button className="bg-transparent mr-2" onClick={openModal}>
        <svg width="14" height="14">
          <use href="/icons/ui.svg#x" />
        </svg>
      </button>

      <dialog ref={dialogRef} className="w-full p-6 rounded bg-gray-2 border border-gray-3 max-w-lg text-inherit backdrop:bg-gray-2/80">
        <div className="text-center flex flex-col gap-y-3 mb-6">
          <h1 className="font-bold text-xl">Delete tag</h1>
          <p className="text-sm text-gray-11">
            Are you sure you want to delete
            {" "}
            <span className="text-blue-11">{name}</span>
            ?
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button type="button" className="button-gray" onClick={closeModal}>Cancel</button>
          <button type="button" className="button" onClick={handleOnDelete}>Yes, delete it!</button>
        </div>
      </dialog>
    </div>
  );
}
