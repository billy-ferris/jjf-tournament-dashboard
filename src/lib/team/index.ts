import { useEffect, useState } from "react";
import { client } from "../../client";

export type Team = {
  id: number;
  name: string;
};

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [teamsLoading, setTeamsLoading] = useState(false);

  const fetchTeams = async (setState: any) => {
    setTeamsLoading(true);
    const { data: teams, error } = await client
      .from("team_with_members")
      .select("name, members")
      .is("deleted_at", null);

    if (error) {
      console.error(error);
      setTeamsLoading(false);
    } else {
      if (setState) setState(teams);
      setTeamsLoading(false);
      return teams;
    }
  };

  useEffect(() => {
    fetchTeams(setTeams).catch((error) => console.error(error));
  }, []);

  return { teams, teamsLoading, fetchTeams };
};
