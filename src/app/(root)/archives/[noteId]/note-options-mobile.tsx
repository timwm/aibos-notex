import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";

import { DeleteBtn } from "./delete-btn";
import { UnarchiveBtn } from "./archive-btn";

type Props = {
  onDeleteBtn: () => void;
  onUnarchiveBtn: () => void;
  isPending: boolean;
};

export default function NoteOptionsMobile({
  onUnarchiveBtn,
  onDeleteBtn,
  isPending,
}: Props) {
  return (
    <div className="flex justify-between px-4 pt-5 lg:hidden">
      <Button asChild className="h-auto p-0" variant="link">
        <Link className="flex items-center gap-1" href="..">
          <Image
            alt=""
            className="h-[18px] w-[18px] rotate-180 transform"
            height={24}
            src={"/images/icon-chevron-right.svg"}
            width={24}
          />
          <span className="text-preset-5">Go Back</span>
        </Link>
      </Button>

      <div className="flex gap-2">
        <DeleteBtn isPending={isPending} onDeleteBtn={onDeleteBtn} />
        <UnarchiveBtn isPending={isPending} onUnarchiveBtn={onUnarchiveBtn} />
      </div>
    </div>
  );
}
