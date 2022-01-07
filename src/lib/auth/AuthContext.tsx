import { useEffect, useState, createContext, FC } from "react";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { client } from "../../client";
import Router from "next/router";
import { ROUTE_AUTH, ROUTE_HOME } from "../../config";
import { UserCredentials } from "@supabase/gotrue-js";
import { useMessage } from "../message";

export type AuthContextProps = {
  user: User | null;
  loading: boolean;
  userLoading: boolean;
  loggedIn: boolean;
  signIn: (payload: UserCredentials) => void;
  signOut: () => Promise<unknown>;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  userLoading: false,
  loggedIn: false,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [loggedIn, setLoggedin] = useState(false);
  const { handleMessage } = useMessage();

  const signIn = async (payload: UserCredentials) => {
    try {
      setLoading(true);
      const { error } = await client.auth.signIn(payload);
      if (error) {
        handleMessage({ message: error.message, type: "error" });
      } else {
        handleMessage({
          message: "Please check your email for the magic link to log in.",
          type: "success",
        });
      }
    } catch (error) {
      handleMessage({
        message: "Oops, something went wrong. Please try again.",
        type: "error",
      });
      // @ts-ignore
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<unknown> => await client.auth.signOut();

  const setServerSession = async (
    event: AuthChangeEvent,
    session?: Session | null
  ): Promise<void> => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    const user = client.auth.user();
    if (user) {
      setUser(user);
      setUserLoading(false);
      setLoggedin(true);
    } else {
      setUserLoading(false);
    }

    const { data: authListener } = client.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null;
        setUserLoading(false);
        await setServerSession(event, session);

        if (user) {
          setUser(user);
          setLoggedin(true);
          await Router.push(ROUTE_HOME);
        } else {
          setUser(null);
          await Router.push(ROUTE_AUTH);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    userLoading,
    loggedIn,
    signIn,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
