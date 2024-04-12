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

- unit test for utils
- i18n
- error instance
- logging middlewares, start and end
- files middleware
- cache GET request
- base class
- script to create template use pluralrize
- minimize crud code
- validator
- tokens
- cookie
- role access, save role in token get role details on init and compare, if updated set in container globally

thunder client
https://github.com/rangav/thunder-client-support
https://github.com/rangav/thunder-client-support/blob/master/docs/tc-types.d.ts

jest test only specific file(s) (match regex pattern)
npm test -- tests/utils/security.test.js
