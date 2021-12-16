import Auth from "../components/Auth";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      <Auth />
    </div>
  );
};

export default IndexPage;
