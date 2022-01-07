import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { Team, useTeam, usePlayer, Player } from "../lib/store";
import { NextAppPageServerSideProps } from "../types/app";
import { ProtectedRoute, useAuth } from "../lib/auth";
import { useEffect, useState } from "react";

const DashboardPage: NextPage = () => {
  const { teams, teamsLoading, teamLoading, getTeamById } = useTeam();
  const { players, playersLoading, playerLoading, getPlayerById } = usePlayer();
  const { user, userLoading, loggedIn } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (!userLoading && loggedIn) {
      const fetchData = async () => {
        if (user) {
          const player = await getPlayerById(user.id);

          if (player) {
            setPlayer(player);

            const team = await getTeamById(1, {
              withMembers: {
                enabled: true,
              },
            });

            if (team) setTeam(team);
          }
        }
      };
      fetchData().catch(console.error);
    }
  }, [userLoading, loggedIn]);

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
          {`Get Team of User: ${
            !teamLoading && team !== null
              ? JSON.stringify(team, null, 2)
              : "Loading..."
          }`}
        </pre>
        <pre className="my-6">
          {`Get All Players: ${
            !playersLoading && players
              ? JSON.stringify(players, null, 2)
              : "Loading..."
          }`}
        </pre>
        <pre className="my-6">
          {`Get Player Profile of User: ${
            !playerLoading && player !== null
              ? JSON.stringify(player, null, 2)
              : "Loading..."
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
