import { useEffect } from "react";

export default function useUserActivity(userId: string | null) {
  useEffect(() => {
    if (!userId) return;

    const updateActivity = async () => {
      try {
        await fetch("/api/update-activity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
      } catch (error) {
        console.error("Failed to update activity:", error);
      }
    };

    updateActivity();
    const interval = setInterval(updateActivity, 30000);

    const handleActivity = () => updateActivity();
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [userId]);
}
