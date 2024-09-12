import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface Props {
  children: React.ReactNode;
  handleClose: () => void;
  isOpen: boolean;
  title: string;
}

export function Modal(props: Props) {
  const { children, handleClose, isOpen, title } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleClose()}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="w-full rounded bg-gray-2 border border-gray-3 p-6 max-w-lg text-inherit backdrop:bg-gray-2/80">
          <DialogTitle className="font-bold text-center text-xl pb-3">
            {title}
          </DialogTitle>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
