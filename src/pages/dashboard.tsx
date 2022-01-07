import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { Team, useTeam } from "../lib/store";
import { NextAppPageServerSideProps } from "../types/app";
import { ProtectedRoute } from "../lib/auth";
import { useEffect, useState } from "react";

const DashboardPage: NextPage = () => {
  const { teams, teamsLoading, teamLoading, getTeamById } = useTeam();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchTeam = async (id: number) => {
      const team = await getTeamById(id, {
        withMembers: {
          enabled: true,
        },
      });
      if (team) setTeam(team);
    };

    fetchTeam(1).catch(console.error);
  }, []);

  return (
    <Layout useBackdrop={false}>
      <div className="bg-white py-16 sm:py-24">
        <Link href={"/profile"} passHref>
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go To Profile
          </button>
        </Link>
        <pre className="my-6">
          {`Get All Teams: ${
            !teamsLoading && teams
              ? JSON.stringify(teams, null, 2)
              : "Loading..."
          }`}
        </pre>
        <pre className="my-6">
          {`Get Team By ID: ${
            !teamLoading && team ? JSON.stringify(team, null, 2) : "Loading..."
          }`}
        </pre>
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
