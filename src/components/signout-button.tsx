"use client";

import React, { useState } from "react";

import { signOut } from "~/actions/auth";
import { Button } from "~/components/ui/button";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <form
      className="cursor-pointer rounded-md px-4 py-2 text-sm text-white"
      onSubmit={handleLogout}
    >
      <Button disabled={loading} type="submit" variant={"outline"}>
        <Logout height={28} width={28} />
        {loading ? "Signing out..." : "Sign out"}
      </Button>
    </form>
  );
};

export default Logout;
