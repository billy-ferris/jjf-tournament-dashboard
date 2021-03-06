import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../client";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  client.auth.api.setAuthCookie(req, res);
};

export default handler;
