import { FC, ReactElement, useState } from "react";
import { client } from "../client";
import { UserCredentials } from "@supabase/gotrue-js";

const Auth: FC = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (payload: UserCredentials) => {
    try {
      setLoading(true);
      const { error } = await client.auth.signIn(payload);
      if (error) {
        alert(error.message);
      } else {
        alert("Please check your email for the magic link");
      }
    } catch (error) {
      alert({
        message: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await handleLogin({ email });
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
