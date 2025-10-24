"use client";

import { usePathname } from "next/navigation";
import Form from "next/form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Search } from "~/components/icons";
import { HOME_URL } from "~/lib/constants";

export const SearchNotes = () => {
  const pathname = usePathname();

  const action = pathname === "/archives" ? "/archives" : HOME_URL;

  return (
    <Form action={action} className="relative">
      <Input
        className="placeholder:text-preset-5 text-preset-7 px-4 py-4 pl-10 lg:w-[300px] dark:placeholder:text-neutral-200"
        name="query"
        placeholder="Search by title, content, or tags..."
        type="text"
      />
      <Button
        className="absolute top-0"
        size="icon"
        type="submit"
        variant="ghost"
      >
        <Search />
      </Button>
    </Form>
  );
};
