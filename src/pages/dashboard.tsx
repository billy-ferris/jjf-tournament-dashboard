import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { useTeam } from "../lib/store";
import { NextAppPageServerSideProps } from "../types/app";
import { ProtectedRoute, useAuth } from "../lib/auth";

const DashboardPage: NextPage = () => {
  const { user } = useAuth();
  const { teams, teamsLoading, createTeam } = useTeam();

  const handleSubmit = async () => {
    if (user) await createTeam({ name: "New Team Test", captain_id: user.id });
  };

  return (
    <Layout useBackdrop={false}>
      <div className="bg-white py-16 sm:py-24">
        <Link href={"/profile"} passHref>
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go To Profile
          </button>
        </Link>
        <pre>
          {!teamsLoading && teams
            ? JSON.stringify(teams, null, 2)
            : "Loading..."}
        </pre>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSubmit}
        >
          Test Create Team Logic
        </button>
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

export default DashboardPage;
