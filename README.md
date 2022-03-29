# Yawik Jobboard

The Yawik Jobboard is a portal for real job ads and serves as an example of a [Quasar](https://quasar.dev) app that can be used as a job board. 

All job advertisements are "real". Posting ads is free of charge. All ads placed are manually checked and activated.

## Install
```bash
git clone git@gitlab.com:yawik/jobboard.git jobboard && cd $_
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn dev
```

### Lint the files
```bash
yarn lint
```
to fix lint errors

```bash
yarn lintfix
```

### Build the app for production
```bash
quasar build
```

### Customize

The jobboard is .env-aware. All possible values are locatewd in `.env`. 
Values in `.env.local` overwrite those in `.env`

| Name                         | Value                                      | 
|------------------------------|--------------------------------------------|
| YAWIK_BACKGROUND             | Background Image on Startpage              |
| YAWIK_JOB_URL                | Endpoint for job details                   |
| YAWIK_SEARCH_URL             | Endpoint for job lists                     |
| YAWIK_EXTERNAL_SEARCH_URL    | External Job search                        |
| YAWIK_EXTERNAL_JOB_URL       | External Job Details                       |
| YAWIK_URL_OPERATOR           | Links to the opeartor of the form          |
| YAWIK_URL_IMPRINT            | Link to the Imprint of the operator        |
| YAWIK_URL_PRIVACY            | Link to the Privacy notes                  |
| YAWIK_GOOGLE_MAPS            | Google Maps Key
|
