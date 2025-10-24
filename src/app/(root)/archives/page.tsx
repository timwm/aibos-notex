import { Notes } from "../components/notes";

export default function ArchivesPage() {
  return (
    <div className="grid min-h-screen lg:hidden">
      <Notes isArchive className="w-full" />
    </div>
  );
}
