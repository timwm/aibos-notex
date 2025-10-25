"use client";

import { redirect } from "next/navigation";
import React, { useState } from "react";

import { signOut } from "~/actions/auth";
import { Logout as LogoutIcon } from "~/components/icons";
import { cn } from "~/lib/utils";
import { LOGIN_URL } from "~/lib/constants";

type LogoutProps = {
  showText?: boolean;
  iconProps?: React.SVGProps<SVGSVGElement>;
  className?: string;
};

const Logout = ({ showText = false, iconProps, className }: LogoutProps) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await signOut();

    if (!error) {
      redirect(LOGIN_URL);
    }
    setLoading(false);
  };

  return (
    <form
      className={cn("cursor-pointer rounded-md text-sm text-white", className)}
      onSubmit={handleLogout}
    >
      <button disabled={loading} type="submit">
        <LogoutIcon height={24} width={24} {...iconProps} />
        {showText && (loading ? "Signing out..." : "Sign out")}
      </button>
    </form>
  );
};

export default Logout;
