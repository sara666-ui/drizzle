Prequisites of using it

- first delete `drizzle` folder in root directory as it contain all migration you don't need that

- setup env `PORT=<your_port>
DATABASE_URL=<your_db_url>
JWT_SECRET=<your_secret>`

- in ./src/db/schema put your schemas in there
- set their specific routes in `drizzle.config.ts` so that when you run migrations it fetches it from their

- also one thing you notice in every file we use .js extention instead of .ts this is because it when we try to deploy it an error occurs which is why we use this

- don't forget to set return types of every function as `Promise<any>` 
