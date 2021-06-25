import { Res } from "./res.ts";

export interface Req extends Request {
  params: Record<string, string> | null;
}

export type route = (req: Req, res: Res) => Promise<void> | void;
export type respondWithType = (
  r: Response | Promise<Response>
) => Promise<void>;
