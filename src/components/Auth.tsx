import { FC, FormEvent, useState } from "react";
import { useAuth } from "../lib/auth";

const Auth: FC = () => {
  const [email, setEmail] = useState("");
  const { loading, signIn } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn({ email });
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
            onClick={handleSubmit}
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
