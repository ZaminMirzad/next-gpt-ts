"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  session: Session | null;
}

export function SessionProvider({ children, session }: Props) {
  return <Provider session={session}>{children}</Provider>;
}
