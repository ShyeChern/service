PROD

```
docker build -t service .
docker run -p 5000:5000 --env-file=.env.production service
```

DEV

```
npm run dev
```

TODO:

- files middleware
- cache GET request
- script to create template use pluralrize
- minimize crud code
- cookie
- role access, save role in token get role details on init and compare, if updated set in container globally
- db audit
- db migration seeder
- concurrency update
- common utils remove duplicates, sort etc (another package maybe)
- cronjob
- k8s setup
- action log queue from db
- db transaction

thunder client
https://github.com/rangav/thunder-client-support
https://github.com/rangav/thunder-client-support/blob/master/docs/tc-types.d.ts

jest test only specific file(s) (match regex pattern)
npm test -- tests/utils/security.test.js

npx eslint

https://www.npmjs.com/package/npm-check-updates
npx npm-check-updates
ncu -u

db migration seeder name file in datetime to allow running in sequence
