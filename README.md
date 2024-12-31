<div align="center">
<h1>Compliment Generator</h1>
<p>Generate random compliments for your friends and family.</p>
<mark>Made for Highseas.</mark>
</div>

## Links

- Frontend: [compliment.gxbs.dev](https://compliment.gxbs.dev)
- API: [compliment-api.deno.dev](https://compliment-api.deno.dev)

## API

For the API, I used [Deno](https://deno.com) and
[Hoco](https://jsr.io/@hoco/hoco).

### Examples

For a compliment without a name:

```http
GET https://compliment-api.deno.dev/{language}/random/withoutname
```

For a compliment with a name:

```http
GET https://compliment-api.deno.dev/{language}/random/name/{name}
```

`{name}` is the name of the person you want to compliment. For example, if you
want to compliment John, you would use:

```http
GET https://compliment-api.deno.dev/random/name/John
```

`{language}` is the language of the compliment. Currently, the only supported
languages are:

- `en`: English
- `ro`: Romanian
- `de`: German

For example, if you want to get a random compliment in English, you would use:

```http
GET https://compliment-api.deno.dev/en/random/withoutname
```

### Development

Make sure you have [Deno](https://deno.com) installed.

To start the server, run:

```bash
deno run -NR mod.ts
```

> ![NOTE] Make sure you are in the `api` directory.

## Frontend

### Development

The project is build using [Vite](https://vite.dev) and
[Svelte](https://svelte.dev).\

Make sure you have [Deno](https://deno.com) installed.

### Installation

```bash
deno install
```

### Scripts

- `dev`: Start the development server (`deno task dev`)
- `build`: Build the project (`deno task build`)
- `preview`: Serve the build project (`deno task preview`)

## License

This project is licensed under the GNU Affero General Public License v3.0. See
the [LICENSE](LICENSE.txt) file for more information.
