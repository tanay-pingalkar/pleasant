import { Res } from "./res.ts";
import { route } from "./types.ts";

export class Server {
  server;
  port: number;
  gets: Record<string, route> = {};
  posts: Record<string, route> = {};

  constructor(port: number) {
    this.port = port;
    this.server = Deno.listen({ port: this.port });
  }

  async up() {
    console.log(`server is up on http://localhost:${this.port}`);
    for await (const conn of this.server) {
      (async () => {
        const httpConn = Deno.serveHttp(conn);
        for await (const requestEvent of httpConn) {
          if (requestEvent.request.method === "GET") {
            if (this.gets[requestEvent.request.url.split(`${this.port}`)[1]]) {
              try {
                await this.gets[
                  requestEvent.request.url.split(`${this.port}`)[1]
                ](requestEvent.request, new Res(requestEvent.respondWith));
              } catch (error) {
                new Res(requestEvent.respondWith).send({
                  error: error.message,
                });
              }
            } else {
              new Res(requestEvent.respondWith).send({
                error: "route not found",
              });
            }
          }
        }
      })();
    }
  }

  get(route: string, callback: route) {
    this.gets[route] = callback;
  }
  post(route: string, callback: route) {
    this.posts[route] = callback;
  }

  async static(path: string, base: string = path) {
    const dir = Deno.readDir(path);

    for await (const data of dir) {
      if (data.isFile) {
        this.gets[`${base}/${data.name}`] = async (_, res) => {
          res.file(`${path}/${data.name}`);
        };
      } else {
        this.readDir(`${path}/${data.name}`, `${base}/${data.name}`);
      }
    }
  }

  private async readDir(path: string, base: string) {
    const dir = Deno.readDir(path);

    for await (const data of dir) {
      if (data.isFile) {
        this.gets[`${base}/${data.name}`] = async (_, res) => {
          res.file(`${path}/${data.name}`);
        };
      } else {
        this.readDir(`${path}/${data.name}`, `${base}/${data.name}`);
      }
    }
  }
}
