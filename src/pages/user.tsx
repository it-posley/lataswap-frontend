import { getSession, signOut } from "next-auth/react";
import type { GetServerSideProps, NextPage } from "next";

interface PageProps {
  user: {
    address: string;
    profileId: string;
    expirationTime: string | undefined;
    signature: any;
  };
}

// gets a prop from getServerSideProps
const User: NextPage<PageProps> = ({ user }) => {
  return (
    <div>
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={() => signOut({ redirect: false, callbackUrl: "/signin" })}
      >
        Sign out
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
};

export default User;
