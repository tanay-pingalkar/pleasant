import { Server } from "./lib/lib.ts";

const app = new Server(8000);

app.get("/", (req, res) => {
  res.status(400).send("pleasant");
});

app.static("lib");

await app.up();
