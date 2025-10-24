import type { NotesWithTags } from "~/types";
import { getAllNotes } from "~/actions/notes";
import { cn } from "~/lib/utils";
import ErrorFallback from "~/components/error-fallback";
import { getUserSession } from "~/actions/auth";

import { CreateNoteBtn } from "./create-note-btn";
import { AllNotes } from "./all-notes";

type Props = {
  className?: string;
  isArchive?: boolean;
};

export const Notes = async ({ className, isArchive }: Props) => {
  const { error, user } = await getUserSession();
  const notes = error ? [] : await getAllNotes(user);

  let filteredNotes: NotesWithTags[];

  if (isArchive) {
    filteredNotes = notes.filter((note) => note.is_archived);
  } else {
    filteredNotes = notes.filter((note) => !note.is_archived);
  }

  return (
    <div
      className={cn(
        "h-full border-neutral-200 px-4 pt-5 md:px-8 lg:w-[290px] lg:border-r dark:border-neutral-700",
        className,
      )}
    >
      {!isArchive && <CreateNoteBtn />}
      {filteredNotes.length > 0 ? (
        <ErrorFallback isError={!!error}>
          <AllNotes isArchive={isArchive} notes={filteredNotes} />
        </ErrorFallback>
      ) : (
        <p className="text-preset-5 rounded-lg bg-neutral-200 p-2 text-neutral-950">
          You don&amp;t have any notes yet. Start a new note to capture your
          thoughts and ideas.
        </p>
      )}
    </div>
  );
};
