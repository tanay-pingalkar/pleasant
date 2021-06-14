import { respondWithType } from "./types.ts";

export class Res {
  resW: respondWithType;
  headersVal: Record<string, string> = {};
  statusVal: number | undefined;
  constructor(resW: respondWithType) {
    this.resW = resW;
    return this;
  }

  status(status: number): this {
    this.statusVal = status;
    return this;
  }

  send(data: any) {
    this.resW(
      new Response(JSON.stringify(data), {
        status: this.statusVal,
        headers: {
          ...this.headersVal,
        },
      })
    );
  }

  async file(path: string) {
    const file = await Deno.readFile(path);
    this.resW(
      new Response(file, {
        status: this.statusVal,
        headers: {
          ...this.headersVal,
        },
      })
    );
  }

  header(name: string, content: string) {
    this.headersVal[name] = content;
  }

  headers(header: Record<string, string>) {
    this.headersVal = header;
  }
}
