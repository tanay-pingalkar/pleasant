# pleasant
a pleasant http framework for deno


## installation
``` javascript
import { Server } from "https://deno.land/x/pleasant@v0.0.1/lib/lib.ts";
```

# usage 
## get request
``` javascript
import { Server } from "https://deno.land/x/pleasant@v0.0.1/lib/lib.ts";

const app = new Server(8080);

app.get("/", (_, res) => {
  res.status(400).send("hello");
});

app.up();
```

## post request 
```javascript
import { Server } from "https://deno.land/x/pleasant@v0.0.1/lib/lib.ts";

const app = new Server(8080);

app.post("/", (req, res) => {
  res.status(200).send(req.body);
});

app.up();
```

## sending file
``` javascript
import { Server } from "https://deno.land/x/pleasant@v0.0.1/lib/lib.ts";

const app = new Server(8080);

app.get("/index", (req, res) => {
  res.status(400).file("/index.html");
});

app.up();

```

## serving static files
```javascript
import { Server } from "https://deno.land/x/pleasant@v0.0.1/lib/lib.ts";

const app = new Server(8080);

app.static("/static");

app.up();
```

## set headers
``` javascript
import { Server } from "https://deno.land/x/pleasant@v0.0.1/lib/lib.ts";

const app = new Server(8080);

app.get("/index", (req, res) => {
  res.header("header name","header value").status(400).file("/index.html");
});

app.up();
```

## params
``` javascript
app.get("/params",(req,res)=>{
  res.status(200).send(req.params);
})
```
for `host/params?p1=123&p2=12`
return `{"p1":"123","p2":"12"}`


