import "./globals.css";
import { Inter } from "next/font/google";
import { Head } from "./head";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat GPT clone",
  description: "A chat GPT clone app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              {/* TODO Sidebar */}
              <div className="overflow-y-auto max-w-xs h-screen md:min-w-[18rem] bg-slate-700">
                <Sidebar />
              </div>
              {/* Client Providers - notification component... */}
              <ClientProvider />
              {/* children */}
              <div className="bg-slate-800 text-slate-100 flex-1 ">
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
