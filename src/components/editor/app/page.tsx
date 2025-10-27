import { Room } from "~/components/editor/components/app/Room";
import { TextEditor } from "~/components/editor/components/components/TextEditor";

export default function Home() {
  return (
    <main>
      <Room>
        <TextEditor />
      </Room>
    </main>
  );
}
