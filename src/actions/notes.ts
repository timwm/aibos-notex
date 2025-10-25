"use server";

// import { currentUser } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";
import { User } from "@supabase/supabase-js";

import { notesTable, tagsTable, usersTable } from "~/db/schema";
import { db } from "~/db";

export const getAllNotes = cache(async (user: User) => {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  const notesData = await db.query.notesTable.findMany({
    where: eq(notesTable.userId, user.id),
    with: {
      tags: true,
    },
  });

  if (!notesData) {
    return [];
  }

  return notesData;
});

export const getNotesByTag = cache(async (tag: string, user: User) => {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  const notesData = await db.query.tagsTable.findMany({
    where: and(eq(tagsTable.userId, user.id), eq(tagsTable.name, tag)),
    with: {
      note: true,
    },
  });

  if (!notesData) {
    return [];
  }

  return notesData;
});

export const searchNotes = cache(async (query: string, user?: User) => {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  if (!user) {
    throw new Error(`Invalid User: ${user}`);
  }

  const notesData = await db.select().from(notesTable).where(sql`(
      setweight(to_tsvector('english', ${notesTable.title}), 'A') ||
      setweight(to_tsvector('english', ${notesTable.content}), 'B'))
      @@ to_tsquery('english', ${query}
    )`);

  if (!notesData) {
    return [];
  }

  return notesData;
});

export const getNote = cache(async (id: number, user: User) => {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  const noteData = await db.query.notesTable.findFirst({
    where: and(eq(notesTable.userId, user.id), eq(notesTable.id, id)),
    with: {
      tags: true,
    },
  });

  if (!noteData) {
    throw new Error("Note not found");
  }

  return noteData;
});

export async function archiveNote(noteId: number, user: User) {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  await db
    .update(notesTable)
    .set({
      is_archived: true,
    })
    .where(and(eq(notesTable.userId, user.id), eq(notesTable.id, noteId)));

  revalidatePath("/notes");
}

export async function unarchiveNote(noteId: number, user: User) {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  await db
    .update(notesTable)
    .set({
      is_archived: false,
    })
    .where(and(eq(notesTable.userId, user.id), eq(notesTable.id, noteId)));

  revalidatePath("/notes");
}

export async function deleteNote(noteId: number, user: User) {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  await db
    .delete(notesTable)
    .where(and(eq(notesTable.userId, user.id), eq(notesTable.id, noteId)));

  revalidatePath("/notes");
  redirect("/");
}

export const getAllTags = cache(async (user: User) => {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  const tagsData = await db.query.tagsTable.findMany({
    where: eq(tagsTable.userId, user.id),
  });

  if (!tagsData) {
    return [];
  }

  return tagsData;
});

export async function addNote(
  {
    title,
    content,
    allTags,
  }: {
    title: string;
    content: string;
    allTags: string[];
  },
  user: User,
) {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  const noteUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.userId, user.id),
  });

  if (!noteUser) {
    await db.insert(usersTable).values({
      userId: user.id!,
      email: user.email!,
      username: user.user_metadata.username,
    });
  }

  const noteData = await db
    .insert(notesTable)
    .values({
      userId: user.id,
      title,
      content,
    })
    .returning({ insertedId: notesTable.id });

  if (!noteData) {
    throw new Error("Note not found");
  }

  for (const tag of allTags) {
    await db.insert(tagsTable).values({
      name: tag,
      noteId: noteData[0].insertedId,
      userId: user.id,
    });
  }

  revalidatePath("/");
  redirect(`/notes/${noteData[0].insertedId}`);
}

export async function updateNote(
  {
    id,
    title,
    content,
    allTags,
  }: {
    id: number;
    title: string;
    content: string;
    allTags: string[];
  },
  user: User,
) {
  // const user = await currentUser();

  // if (!user) {
  //   throw new Error("User not found");
  // }

  await db
    .update(notesTable)
    .set({
      title,
      content,
    })
    .where(and(eq(notesTable.userId, user.id), eq(notesTable.id, id)));

  await db.delete(tagsTable).where(eq(tagsTable.noteId, id));

  for (const tag of allTags) {
    await db.insert(tagsTable).values({
      name: tag,
      noteId: id,
    });
  }

  revalidatePath(`/notes/${id}`);
}
