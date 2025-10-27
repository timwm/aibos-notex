import { getAllTags } from "~/actions/notes";
import { getUserSession } from "~/actions/auth";

import { MainHeader } from "./components/main-header";
import { Notes } from "./components/notes";
import { Tags } from "./components/tags";
import { SearchNotes } from "./components/search-notes";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Home(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { error, user } = await getUserSession();
  const tags = error ? [] : await getAllTags(user);
  const uniqueTags = Array.from(new Set(tags.map((tag) => tag.name)));

  const searchParams = await props.searchParams;
  const isTagEnabled = searchParams.tags !== undefined;
  const isSearchEnabled = searchParams.search !== undefined;

  return (
    <>
      {/* <header className="bg-neutral-100 px-4 py-3 md:px-8 md:py-6 lg:hidden dark:bg-neutral-800">
        <Link href="/">
          <Logo />
        </Link>
      </header> */}
      <MainHeader />
      <div className="grid min-h-screen grid-rows-[auto_1fr]">
        {isSearchEnabled && (
          <div className="block px-4 py-5 md:px-8 md:py-6 lg:hidden">
            <p className="text-preset-1 mb-4">Search</p>
            <SearchNotes />
          </div>
        )}
        {isTagEnabled ? (
          <div className="mt-2 block px-4 lg:hidden">
            {(error && (
              <div className="font-extrabold text-red-500">
                Error loading tags
              </div>
            )) || <Tags tags={uniqueTags} />}
          </div>
        ) : (
          <Notes />
        )}
      </div>
    </>
  );
}
