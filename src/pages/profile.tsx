import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { ProtectedRoute, useAuth } from "../lib/auth";
import { NextAppPageServerSideProps } from "../types/app";

const ProfilePage: NextPage = (/* props: props from SSR */) => {
  const { user, signOut } = useAuth();

  return (
    <Layout useBackdrop={false}>
      <div className="bg-white py-16 sm:py-24">
        <div className="relative sm:py-16">
          <div className="text-center justify-center items-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
              Profile (SSR)
            </h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-4xl">
              Howdie, {user && user.email ? user.email : "Explorer"}!
            </p>
            {user ? (
              <button
                onClick={signOut}
                className="mt-8 block m-auto rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
              >
                Sign Out
              </button>
            ) : (
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                You've landed on a protected page. Please{" "}
                <span className="underline">
                  <Link href="/">log in</Link>
                </span>{" "}
                to view the page's full content
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = (
  context
): Promise<NextAppPageServerSideProps> =>
  ProtectedRoute({
    context,
  });

export default ProfilePage;
