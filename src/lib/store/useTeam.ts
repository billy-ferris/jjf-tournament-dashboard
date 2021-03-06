/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { client } from "../../client";
import { useMessage } from "../message";

export type Team = {
  id?: number;
  name: string;
  captain_id: string;
  is_registered?: boolean;
  updated_at?: string;
};

interface TeamResponseConfig {
  withMembers?: {
    enabled?: boolean;
  };
}

// TODO: use db error code for error message handling
export const useTeam = () => {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const { handleMessage } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      await getAllTeams();
    };
    fetchData().catch(console.error);
  }, []);

  const getAllTeams = async ({ withMembers }: TeamResponseConfig = {}) => {
    try {
      setTeamsLoading(true);

      const withMembersEnabled = withMembers?.enabled ?? false;
      if (withMembersEnabled) {
        const { data, error } = await client
          .from("team")
          .select(
            "id, name, captain_id, is_registered, members:profile!inner(id, email, first_name, last_name)"
          );

        if (error) throw error;
        if (data) setTeams(data);
      } else {
        const { data, error } = await client
          .from("team")
          .select("id, name, captain_id, is_registered");

        if (error) throw error;
        if (data) setTeams(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTeamsLoading(false);
    }
  };

  const getTeamById = async (
    id: number,
    { withMembers }: TeamResponseConfig = {}
  ) => {
    try {
      setTeamLoading(true);

      const withMembersEnabled = withMembers?.enabled ?? false;
      if (withMembersEnabled) {
        const { data, error } = await client
          .from("team")
          .select(
            "id, name, captain_id, is_registered, members:profile!inner(id, email, first_name, last_name)"
          )
          .match({ id })
          .single();

        if (error) throw error;
        return data;
      } else {
        const { data, error } = await client
          .from("team")
          .select("id, name, captain_id, is_registered")
          .match({ id })
          .single();

        if (error) throw error;
        if (data) return data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTeamLoading(false);
    }
  };

  const createTeam = async ({ name, captain_id }: Team) => {
    try {
      const team = {
        name,
        captain_id,
      };

      const { error } = await client.from("team").insert(team);

      if (error) {
        throw error;
      } else {
        handleMessage({
          message: "Team created successfully.",
          type: "success",
        });
      }
    } catch (error) {
      handleMessage({
        message: "Oops, something went wrong. Please try again.",
        type: "error",
      });
      console.error(error);
    }
  };

  const updateTeam = async ({ id, name, captain_id, is_registered }: Team) => {
    try {
      const rowsToUpdate = {
        name,
        captain_id,
        is_registered,
        updated_at: new Date().toISOString(),
      };

      const { error } = await client
        .from("team")
        .update(rowsToUpdate, { returning: "minimal" })
        .match({ id });

      if (error) {
        throw error;
      } else {
        handleMessage({
          message: "Team updated successfully.",
          type: "success",
        });
      }
    } catch (error) {
      handleMessage({
        message: "Oops, something went wrong. Please try again.",
        type: "error",
      });
      console.error(error);
    }
  };

  const deleteTeam = async (id: number) => {
    try {
      const { error } = await client
        .from("team")
        .delete({ returning: "minimal" })
        .match({ id });

      if (error) {
        throw error;
      } else {
        handleMessage({
          message: "Team deleted successfully.",
          type: "success",
        });
      }
    } catch (error) {
      handleMessage({
        message: "Oops, something went wrong. Please try again.",
        type: "error",
      });
      console.error(error);
    }
  };

  return {
    teams,
    teamLoading,
    teamsLoading,
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
  };
};
