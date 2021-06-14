import { Res } from "./res.ts";

export type route = (req: Request, res: Res) => Promise<void> | void;
export type respondWithType = (
  r: Response | Promise<Response>
) => Promise<void>;
