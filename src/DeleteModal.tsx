import Image from "next/image";
import close from "../public/assets/icon-cross.svg";
import Button from "@/Button";

interface IDeleteModalProps {
  titleLabel: string;
  descriptionLabel: string;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  titleLabel,
  descriptionLabel,
  onClose,
  onDelete,
}: IDeleteModalProps) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative m-5 w-96">
          <div className="p-6 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-gray1 dark:text-white outline-none focus:outline-none">
            <button onClick={onClose} className="absolute right-4">
              <Image src={close} alt="close" />
            </button>
            <div>
              <label className="text-xl block mb-2 font-medium text-destructive dark:text-white">
                {titleLabel}
              </label>
            </div>
            <div className="">
              <label className="block mb-2 text-sm text-gray dark:text-white">
                {descriptionLabel}
              </label>
            </div>
            <div className="my-4 flex gap-5 w-auto justify-center">
              <Button variant="destructive" size="large" onClick={onDelete}>
                Delete
              </Button>
              <Button variant="secondary" size="large" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
