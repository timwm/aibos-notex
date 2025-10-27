import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { createClient } from "~/utils/supabase/server";
import { db } from "~/db";
import { usersTable } from "~/db/schema"; // your Drizzle table
import { ERROR_URL, HOME_URL } from "~/lib/constants";
import { parseUrl } from "~/lib/utils";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { origin, next = HOME_URL, searchParams } = parseUrl(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError) {
        // eslint-disable-next-line no-console
        console.error("Error fetching user data:", userError.message);

        return NextResponse.redirect(`${origin}/${ERROR_URL}`);
      }

      const userId = data?.user?.id as string;
      const email = data?.user?.email as string;
      const username = data?.user?.user_metadata?.username;
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      if (existingUser.length === 0) {
        try {
          await db.insert(usersTable).values({
            userId: userId,
            email,
            username,
          });
        } catch (dbError: unknown) {
          // eslint-disable-next-line no-console
          console.error(
            "Error inserting user data:",
            (dbError as Error).message,
          );

          return NextResponse.redirect(`${origin}/${ERROR_URL}`);
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
