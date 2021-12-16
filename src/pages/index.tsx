import Auth from "../components/Auth";
import { NextPage } from "next";
import Layout from "../components/Layout";

const IndexPage: NextPage = () => {
  return (
    <Layout usePadding={false}>
      <Auth />
    </Layout>
  );
};

export default IndexPage;
