import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type RawContent = {
  type: string;
  content: unknown[];
};

export const notesTable = pgTable(
  "notes",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.userId, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    raw_content: jsonb("raw_content").$type<RawContent>(), //.default({}),
    content_type: text("content_type"), // .notNull().default("markdown"),
    is_archived: boolean("is_archived").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => [
    {
      searchIndex: index("search_index").using(
        "gin",
        sql`(setweight(to_tsvector('english', ${table.title}), 'A') || setweight(to_tsvector('english', ${table.content}), 'B'))`,
      ),
    },
  ],
);

export const tagsTable = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  noteId: integer("note_id").references(() => notesTable.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id").references(() => usersTable.userId, {
    onDelete: "cascade",
  }),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  notes: many(notesTable),
  tags: many(tagsTable),
}));

export const notesRelations = relations(notesTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [notesTable.userId],
    references: [usersTable.userId],
  }),
  tags: many(tagsTable),
}));

export const tagsRelations = relations(tagsTable, ({ one }) => ({
  note: one(notesTable, {
    fields: [tagsTable.noteId],
    references: [notesTable.id],
  }),
  author: one(usersTable, {
    fields: [tagsTable.userId],
    references: [usersTable.userId],
  }),
}));
