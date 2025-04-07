// Node Modules
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const AuthSyncPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, userId } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    // Returns the user to home page if they failed to sign in
    if (!isSignedIn) {
      // Removes stored user if user is no longer signed in
      if (localStorage.getItem("clerkUserId")) {
        localStorage.removeItem("clerkUserId");
      }

      navigate("/");
      return;
    }

    // Sets userId in their localStorage for persistence and redirect to TodayPage when signed in.
    if (isSignedIn) {
      localStorage.setItem("clerkUserId", userId); // Currently storing userID in localStorage, improves speed of application, but at cost of security, can be transferred to session storage but no persistence after tab closing, and cookies allow persistence but slows down the application.

      navigate("/app/today");
    }
  }, [isSignedIn, isLoaded, userId]);

  return <></>;
};

export default AuthSyncPage;
