# doc2faq

Pull content from a google doc to generate a FAQ page

install google cloud [sdk](https://cloud.google.com/sdk/docs/install#mac)

sheet id is after the /d [source](https://developers.google.com/sheets/api/guides/concepts)

run on local, follow commands in terminal to download token.json

to deploy:
google cloud run, new project. enable drive api. dont put in redirect uri yet.
deploy once. get uri and add to uri list (in config)
in cloud run edit and deploy revision:
copy token.json info into the envs
allocate 500mb space for project

we deleted all styles, but we still need the formatting styles in the questions. consider just leaving text-transforms
