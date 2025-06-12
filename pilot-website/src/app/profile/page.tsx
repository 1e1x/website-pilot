"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { getUserByIdAction } from "../actions/server-actions";
import type { User } from "@prisma/client";

export default function ProfilePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const currentSession = await getSession();
        if (!currentSession) {
          console.error("No session found.");
          void router.push("/login"); // Redirect to login if no session
          return;
        }

        const username = currentSession.user?.name;
        const userId = currentSession.user?.id;

        if (!username || !userId) {
          console.error("Missing user information in session");
          void router.push("/login");
          return;
        }

        const fetchedUserData = await getUserByIdAction(userId);
        setUserData(fetchedUserData);

        if (fetchedUserData?.name) {
          void router.push(`/profile/${username}`);
        } else {
          void router.push(`/not-found`);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        void router.push("/error");
      } finally {
        setIsLoading(false);
      }
    }

    void loadUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse">Redirecting to your profile...</div>
      </div>
    );
  }

  return null;
}
