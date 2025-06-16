"use client";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";

export default function Navigation() {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentSession = await getSession();
        setSession(currentSession);
      } catch (err) {
        console.error("Error getting session", err);
      }
    }

    void checkAuth();
  }, [router]);
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            className="cursor-pointer text-xl font-bold"
            onClick={() => router.push("/")}
          >
            1e1x
          </div>
          <div className="hidden space-x-8 md:flex">
            <Link
              href="/projects"
              className="text-gray-600 transition-colors hover:text-black"
            >
              Projects
            </Link>
            <Link
              href="/talent"
              className="text-gray-600 transition-colors hover:text-black"
            >
              Talent
            </Link>
            <Link
              href="/arena"
              className="text-gray-600 transition-colors hover:text-black"
            >
              Arena
            </Link>
            <Link
              href="/workshops"
              className="text-gray-600 transition-colors hover:text-black"
            >
              Workshops
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!session && (
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                Sign Up
              </Button>
            )}

            {!session ? (
              <Link href="/login">
                <Button size="sm" className="cursor-pointer">
                  Log In
                </Button>
              </Link>
            ) : (
              <button
                onClick={() => router.push("/profile")}
                className="text-primary cursor-pointer text-sm font-medium hover:underline"
              >
                {session.user.name}
              </button>
            )}
            {session && (
              <Button
                className="cursor-pointer"
                onClick={() => signOut()}
                variant="outline"
                size="sm"
              >
                Log out
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
