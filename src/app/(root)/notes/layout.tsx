import { MainHeader } from "../components/main-header";
import { Notes } from "../components/notes";

export default function NotesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid h-screen lg:grid-rows-[auto_1fr]">
      <MainHeader />
      <div className="grid h-full grid-cols-[auto_1fr] overflow-hidden">
        <Notes className="hidden overflow-y-auto lg:block" />
        <div className="flex flex-col overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
