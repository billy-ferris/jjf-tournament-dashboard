import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layout";
import { useAuthWithRedir, ProtectedRoute } from "../lib/auth";

const ProfilePage: NextPage = (/* props from SSR */) => {
  const { user, signOut } = useAuthWithRedir();

  // if (userLoading) {
  //   return <FullPageSpinner />;
  // }

  return (
    <Layout useBackdrop={false}>
      <div className="h-screen flex flex-col justify-center items-center relative">
        <h2 className="text-3xl my-4">
          Howdie, {user && user.email ? user.email : "Explorer"}!
        </h2>
        {!user && <small>You've landed on a protected page. Please</small>}
        {user && (
          <div>
            <button
              onClick={signOut}
              className="border bg-gray-500 border-gray-600 text-white px-3 py-2 rounded w-full text-center transition duration-150 shadow-lg"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = (context) =>
  ProtectedRoute({
    context,
  });

export default ProfilePage;
