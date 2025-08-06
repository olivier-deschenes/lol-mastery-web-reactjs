import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";

export const AuthNavigation = () => {
  const session = authClient.useSession();

  return (
    <div className={"flex gap-5 items-center"}>
      {session.data ? (
        <>
          <Button onClick={() => authClient.signOut()}>Logout</Button>
          <Button variant={"ghost"}>
            <Link to={"/user"}>Hi, {session.data.user.name}</Link>
          </Button>
        </>
      ) : (
        <Button
          onClick={() =>
            authClient.signIn.social({
              provider: "github",
              callbackURL: import.meta.env.VITE_BASE_URL,
            })
          }
        >
          Login
        </Button>
      )}
    </div>
  );
};
