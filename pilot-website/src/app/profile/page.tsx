"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { getUserByIdAction } from "../actions/server-actions";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [session, setSession] = useState<any>(null); // use 'any' to allow user.id access

  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const currentSession = await getSession();
        if (!currentSession) {
          console.error("No session found.");
          return;
        }

        setSession(currentSession);
        const username = currentSession.user.name;
        const userId = currentSession.user.id;

        const fetchedUserData = await getUserByIdAction(userId);
        setUserData(fetchedUserData);

        if (fetchedUserData?.name) {
          setIsCurrentUser(username === fetchedUserData.name);
          console.log("Username:", username);
          console.log("UserData name:", fetchedUserData.name);
          
          router.push(`/profile/${username}`);
        } else {
        router.push(`not-found`);

        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    }

    loadUser();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse">Redirecting to your profile...</div>
    </div>
  );
}
