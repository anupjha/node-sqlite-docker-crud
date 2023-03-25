# Get Started

## Quick start

`docker-compose up`

## Required Environment Variables:

```
APP_SECRET=
```

## Install and Run:

With npm:

```
npm install
npm run start
```

## TypeScript Watcher

`npm start`

## Data Persistence

This project uses `sqlite3` in memory and is meant to be used for small MVPs for dev purposes. The data layer can easily be changed to use postgres, ms sql server, mysql, etc as needed.

There is a default script `setupDbForDev` in the `dao.ts` file that will run to create tables, insert values, etc. Please note, I have a `DROP TABLE IF EXISTS` statement that will run automatically at runtime.

The `items.controller.ts` is here to provide an example controller that will interact with the `repository` and `dao`. It requires valid authentication to use to demonstrated how to protect routes in this project.

## Authentication

The `auth.controller.ts` will use the 'users' table created in the `dao.ts` by default. `bcrpyt` is used to hash password and `njwt` is used to create, decode, and encode JSON Web Tokens. JWTs by default are valid for one week. This can be changed in the `auth.controller.ts`.

To authenticate make a PUT request to `/api/auth/login`.

The request body should be:

```
{
    "email":"foo@bar.com",
    "password":"123"

}
```

You will receive an access_token response. This is to be sent as your "Access-Token" header.

## Signup

I also added a sign up route to this project (which did not exist in the vanilla JS version). A request body with an email and password to the `/api/auth/signup` will create a new user. Upon successful response, a user can make a `GET` request with the same body to the `/api/auth/login` endpoint to receieve and `access-token`.

## Unit Tests

I These tests use `jest` and there are sample tests in the `/tests/` directory.

## API Docs

1. An API to add a new record to the dataset.
2. An API to delete a new record to the dataset.
3. An API to fetch SS for salary over the entire dataset. You can ignore the currency (if not
   mentioned otherwise) of the salary and simply treat salary as a number.

4. An API to fetch SS for salary for records which satisfy "on_contract": "true".
5. An API to fetch SS for salary for each department. This means that whatever you’ll do in Step
   3, should be done for each department. The return of this API should have 1 SS available
   for each unique department.
6. An API to fetch SS for salary for each department and sub-department combination. This
   is similar to Case 5 but 1 level of nested aggregation.
