import { getNote } from "~/actions/notes";
import { getUserSession } from "~/actions/auth";
import ErrorFallback from "~/components/error-fallback";

import { ShowNote } from "./show-note";

type Props = {
  params: Promise<{ noteId: string }>;
};

export default async function ArchiveNotePage({ params }: Props) {
  const { noteId } = await params;
  const { user } = await getUserSession();

  if (user) {
    const note = await getNote(Number(noteId), user);

    return <ShowNote note={note} />;
  }

  return <ErrorFallback isError={true} />;
}
