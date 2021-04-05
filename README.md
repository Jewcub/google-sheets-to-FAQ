# doc2faq

View [example](https://jacob-testing-app.xyz)

Pull content from a google doc to generate a FAQ page

The doc mus be a google doc list in this format:

- Section Name
  - Question
    - Answer paragraph
      - (optional) Answer sub paragraph (will display as bulleted list)
      - (optional) Answer sub paragraph
    - Another paragraph
  - Question 2 - Answer
- Section 2
  ... and so on

see server/files/intial.html for the raw google html from the test google doc

For now, only _italic_, **bold**, underlined is supported. More stylings can be added as needed.

### Get Google credentials

In google [cloud run](https://cloud.google.com) make new project. Get client id and secret, and write into .env (see example)
Enable drive api. put in localhost:3001 as redirect uri.

In server/src/config.ts, put an ID of a google doc you control in the `const docID =`

The document should be formatted as an unordered list as per the example

Google doc id is in the url for the after the /d
https://docs.google.com/spreadsheets/d/<docID-is-here>/edit#gid=0

### Dev

```bash
yarn inst # installs server/client
# the first time you want to run server/app in different terminals for better logs and to get the token redirect URL
yarn dev:server
yarn dev:client # app will be on localhost:3000
# open the client app in the browser, then follow commands in terminal to download token.json. It should have been saved in server/src/files/token.json


# subsequent dev builds can use
yarn dev
```

### Test

Currently just tests the most fragile/complicated part of the app which is the html parser

```bash
yarn test:server
```

### Deploy

Non Docker deploy

```bash
# on server
git init
git remote add origin https://github.com/Jewcub/doc2faq.git
git fetch origin
git reset --hard origin/main #will remove any local files.
git checkout origin/main -ft
yarn inst
```

then copy the .env file into /server/
add server's host name to [google redirect urls](https://console.cloud.google.com/apis/credentials) in `credentials` > `Authorized redirect URIs`
add url to `redirectUris` in server/config.ts

```bash
yarn start
```

open the client app in the browser, then follow commands in terminal to download token.json.
you should see `Authorize this app by visiting this url:` and the link
Follow the browser instructions and after redirect, extract the `code` from the url which will look like: `https://<the-site-url>/?code=<code-is-here>&scope=https://www.googleapis.com/auth/drive`
input `code` in the terminal and it will be saved into dist/files/token.json, but make sure to copy to server/src/files/token.json so that future builds also include it.

Docker deploy on Google cloud run (TO DO)

#### reference / notes:

install google cloud [sdk](https://cloud.google.com/sdk/docs/install#mac)

Docker Google Cloud Run Deploy start:
deploy once. get uri and add to uri list (in config)
in cloud run edit and deploy revision:
copy token.json info into the envs
allocate 500mb space for project
