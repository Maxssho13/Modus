import { useState } from "react";
import Image from "next/image";
import { Button, Collapse } from "react-daisyui";
import { BiLogOut as LogOutIcon } from "react-icons/bi";
import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthStatus = () => {
  const [drop, setDrop] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      {status === "authenticated" ? (
        <Collapse
          onMouseEnter={() => setDrop(true)}
          onMouseLeave={() => setDrop(false)}
          open={drop}
          className="absolute right-4 top-4 rounded-lg border border-gray-600 bg-opacity-30">
          <Collapse.Title className="flex items-center gap-2 bg-base-100 px-2">
            <Image
              className="rounded-full"
              src={session.user?.image ?? ""}
              width={32}
              height={32}
              alt=""
            />
            <p className="hidden md:block">{session.user?.name}</p>
          </Collapse.Title>
          <Collapse.Content className="bg-base-100 pl-1">
            <Link href="/">
              <div
                className="flex cursor-pointer items-center gap-2 text-red-600"
                onClick={async () => {
                  await signOut({
                    redirect: false,
                    callbackUrl: "/",
                  });
                  router.push("/");
                }}>
                <LogOutIcon className="text-3xl" />

                <p className="text-md hidden md:block">Sign Out</p>
              </div>
            </Link>
          </Collapse.Content>
        </Collapse>
      ) : (
        <Button
          className="absolute right-6 top-3 rounded-lg bg-gray-600 bg-opacity-40"
          onClick={() => signIn("google")}>
          sign in
        </Button>
      )}
    </>
  );
};

export default AuthStatus;
