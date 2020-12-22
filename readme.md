# Weekly assessment 4 (1 hour)

Start with the exercise described in this file. To complete it you can search docs online, but not entire solutions. Then answer the questions that you find in `questions.md`, without using any external sources.

If you're stuck on something, move on with the rest and come back to it after having completed the other parts.

## Exercise

Within the `./server` folder, create a `package.json` file (running `npm init`) and the necessary files to implement an MVC HTTP web server using Koa (and any other required modules), so that it provides the following features:

- All your dependencies are saved in the `server/package.json` file.

- The entry point is `index.js`, and the server listens on port 3000.

- The `/hello/:name` route receives GET requests with a "name" parameter, and responds with an HTML page containing an `<h1>` title that says "Hello name!" where "name" has the value indicated in the request.

- For rendering the view it uses a templating engine of your choice.

- For any request outside of the indicated route and method, the server responds with a 404 code, and sends an HTML page containing an `<h1>` title that says "Sorry, this URL does not exist".

## Extra credit

- Add a `/search/:query` route that receives GET requests with a "query" parameter, then fetches the HTML result of searching that query on Google, stores the query and the corresponding result in a local object in memory or one db of your choice, and returns the result.

- Future requests with the same query string should return directly from the local object in memory or the db instead of re-feching the result from Google.
