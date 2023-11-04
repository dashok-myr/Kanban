import Navbar from "@/Navbar";
import Image from "next/image";
import ellipsis from "../../public/assets/icon-vertical-ellipsis.svg";
import Button from "@/Button";

export default function Home() {
  return (
    <main className="flex h-screen divide-x divide-violet-100">
      <div className="w-1/5">
        <Navbar />
      </div>
      <div className="flex flex-col w-4/5 divide-y divide-violet-100">
        <div className="flex justify-between m-4 items-center">
          <div className="text-xl font-semibold">Platform Launch</div>
          <div className="flex gap-5 items-center">
            <Button size="large" variant="primary">
              + Add New Task
            </Button>
            <Image className="h-5" src={ellipsis} alt="ellipsis" />
          </div>
        </div>
        <div className="bg-light-gray h-screen flex justify-center items-center">
          <div className="flex flex-col gap-5">
            <span className="text-gray">
              This board is empty. Create a new board to get started.
            </span>
            <Button size="large" variant="primary">
              + Add New Column
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
