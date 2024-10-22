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
- configs models, cache configs?
- script to create template use pluralrize
- data validation
- minimize crud code
- cookie
- role access, save role in token get role details on init and compare, if updated set in container globally
- concurrency update
- cronjob
- k8s setup
- aggregate default projection/virtuals
- joi validation message

https://marketplace.visualstudio.com/items?itemName=humao.rest-client

jest test only specific file(s) (match regex pattern)
npm test -- tests/utils/security.test.js

npm run lint -- --fix

https://www.npmjs.com/package/npm-check-updates
npx npm-check-updates
ncu -u

db migration seeder name file in datetime to allow running in sequence, always run in transaction
