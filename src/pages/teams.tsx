import { NextPage } from "next";
import Layout from "../components/Layout";
import { useTeams } from "../lib/team";

const TeamsPage: NextPage = () => {
  const { teams, teamsLoading } = useTeams();

  return (
    <Layout useBackdrop={false}>
      <div className="bg-white py-16 sm:py-24">
        <pre>
          {teamsLoading ? "Loading..." : JSON.stringify(teams, null, 2)}
        </pre>
      </div>
    </Layout>
  );
};

export default TeamsPage;
