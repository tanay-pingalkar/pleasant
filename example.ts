import { Server } from "./lib/lib.ts";

const app = new Server(8080);

app.get("/", (req, res) => {
  res.status(400).send("pleasant");
});

app.up();
