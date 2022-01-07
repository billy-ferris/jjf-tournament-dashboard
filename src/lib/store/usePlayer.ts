/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { useMessage } from "../message";
import { client } from "../../client";

export type Player = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  team_id: number;
};

export const usePlayer = () => {
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [playersLoading, setPlayersLoading] = useState(false);
  const [playerLoading, setPlayerLoading] = useState(false);
  const { handleMessage } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      await getAllPlayers();
    };
    fetchData().catch(console.error);
  }, []);

  const getAllPlayers = async () => {
    try {
      setPlayersLoading(true);

      const { data, error } = await client.from("profile").select("*");

      if (error) throw error;
      if (data) setPlayers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setPlayersLoading(false);
    }
  };

  const getPlayerById = async (id: string) => {
    try {
      setPlayerLoading(true);

      const { data, error } = await client
        .from("profile")
        .select("*")
        .match({ id })
        .single();

      if (error) throw error;
      if (data) return data;
    } catch (error) {
      console.error(error);
    } finally {
      setPlayerLoading(false);
    }
  };

  const updatePlayer = async ({
    id,
    email,
    first_name,
    last_name,
    team_id,
  }: Player) => {
    try {
      const rowsToUpdate = {
        email,
        first_name,
        last_name,
        team_id,
        updated_at: new Date().toISOString(),
      };

      const { error } = await client
        .from("profile")
        .update(rowsToUpdate, { returning: "minimal" })
        .match({ id });

      if (error) {
        throw error;
      } else {
        handleMessage({
          message: "Player updated successfully.",
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
    players,
    playersLoading,
    playerLoading,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
  };
};
