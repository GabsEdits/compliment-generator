import { Hono } from "jsr:@hono/hono";

import complimentsWithName from './name.json' with { type: 'json' };
import complimentsWithoutName from './withoutname.json' with { type: 'json' };

const app = new Hono();

app.use('*', (c, next) => {
    c.res.headers.set('Access-Control-Allow-Origin', '*');
    c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});

app.get('/name/:name', (c) => {
    const name = c.req.param('name');
    const personalizedCompliments = (complimentsWithName as string[]).map(compliment => compliment.replace('${name}', name));
    return c.json(personalizedCompliments);
});

app.get('/withoutname', (c) => {
    return c.json(complimentsWithoutName);
});

app.get('/random/name/:name', (c) => {
    const name = c.req.param('name');
    const randomIndex = Math.floor(Math.random() * (complimentsWithName as string[]).length);
    const randomCompliment = (complimentsWithName as string[])[randomIndex].replace('${name}', name);
    return c.json(randomCompliment);
});

app.get('/random/withoutname', (c) => {
    const randomIndex = Math.floor(Math.random() * (complimentsWithoutName as string[]).length);
    return c.json((complimentsWithoutName as string[])[randomIndex]);
});

app.notFound((c) => c.text("Not Found", 404));

Deno.serve(app.fetch);

export { app };
