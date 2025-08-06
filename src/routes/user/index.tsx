import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/user/")({
  component: RouteComponent,
  beforeLoad: async ({ context: { auth } }) => {
    await new Promise((res) => setTimeout(res, 5000));
    const { data } = await auth.getSession();

    if (!data) {
      throw redirect({ to: "/" });
    }

    return {
      checkedSession: data,
    };
  },
});

function RouteComponent() {
  const { checkedSession } = Route.useRouteContext();

  return (
    <div className={"text-white"}>
      <h1>User</h1>
      <div>{checkedSession?.user.email}</div>
    </div>
  );
}
