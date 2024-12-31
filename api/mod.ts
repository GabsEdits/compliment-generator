import { Hono } from "jsr:@hono/hono";

const app = new Hono();

app.use("*", (c, next) => {
  c.res.headers.set("Access-Control-Allow-Origin", "*");
  c.res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  c.res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return next();
});

app.get("/:lang/name/:name", async (c) => {
  const lang = c.req.param("lang");
  const name = c.req.param("name");
  const complimentsWithName = await import(`./${lang}/name.json`, {
    with: { type: "json" },
  });
  const personalizedCompliments = (complimentsWithName.default as string[]).map(
    (compliment) => compliment.replace("${name}", name),
  );
  return c.json(personalizedCompliments);
});

app.get("/:lang/withoutname", async (c) => {
  const lang = c.req.param("lang");
  const complimentsWithoutName = await import(`./${lang}/withoutname.json`, {
    with: { type: "json" },
  });
  return c.json(complimentsWithoutName.default);
});

app.get("/:lang/random/name/:name", async (c) => {
  const lang = c.req.param("lang");
  const name = c.req.param("name");
  const complimentsWithName = await import(`./${lang}/name.json`, {
    with: { type: "json" },
  });
  const randomIndex = Math.floor(
    Math.random() * (complimentsWithName.default as string[]).length,
  );
  const randomCompliment =
    (complimentsWithName.default as string[])[randomIndex]
      .replace("${name}", name);
  return c.json(randomCompliment);
});

app.get("/:lang/random/withoutname", async (c) => {
  const lang = c.req.param("lang");
  const complimentsWithoutName = await import(`./${lang}/withoutname.json`, {
    with: { type: "json" },
  });
  const randomIndex = Math.floor(
    Math.random() * (complimentsWithoutName.default as string[]).length,
  );
  return c.json((complimentsWithoutName.default as string[])[randomIndex]);
});

app.notFound((c) => c.text("Not Found", 404));

Deno.serve(app.fetch);

export { app };
