```js
// Custom validation return error
const create = Joi.object({
	addresses: Joi.array()
		.items(
			Joi.object({
				name: Joi.custom((value, helpers) => {
					// context passing from base
					const context = helpers.prefs.context;
					// full object value
					const parent = helpers.state.ancestors.pop();
					return helpers.message(context.t('user.notFound'));
				}),
			}),
		)
		.min(1),
});
```
