const { isCssModules, rootDirectory } = require('./buildTools/constants'),
	fs = require('fs');

const requireField = (fieldName) => {
	return (value) => {
		if (String(value).length === 0) {
			return fieldName + ' is required';
		}
		return true;
	};
};

const startsWithUseKeyWord = () => {
	return (value) => {
		if (String(value).startsWith('use')) {
			return true;
		}
		return 'Custom hooks should start with use keyword';
	};
};

const isStoreEntityExist = (entityName) =>
	fs.existsSync(`./${rootDirectory}/ts/store/${entityName}`);

const createQuestion = (type) => {
	const isReducer = type === 'reducer',
		isHook = type === 'hook';

	if (isReducer) {
		return [
			{
				type: 'input',
				name: 'reducerEntity',
				message: `What is your entity name (directory in store)?`,
				validate: requireField('reducerEntity'),
			},
			{
				type: 'input',
				name: 'name',
				message: `What is your ${type} name?`,
				validate: requireField('name'),
			},
		];
	} else {
		return {
			// Raw text input
			type: 'input',
			// Variable name for this input
			name: 'name',
			// Prompt to display on command line
			message: `What is your ${type} name?`,
			// make sure that name is not empty
			validate: isHook ? requireField('name') && startsWithUseKeyWord() : requireField('name'),
		};
	}
};

module.exports = (plop) => {
	plop.setGenerator('component', {
		description: 'Create a component',
		// User input prompts provided as arguments to the template
		prompts: [createQuestion('component')],
		actions: function () {
			let actionsList = [
				{
					// Add a new file
					type: 'add',
					// Path for the new file
					path: `${rootDirectory}/ts/components/{{camelCase name}}/{{pascalCase name}}.tsx`,
					// Handlebars template used to generate content of new file
					templateFile: 'generatorTemplates/component/Component.js.hbs',
					data: { isCssModules },
				},
				{
					type: 'add',
					path: `${rootDirectory}/ts/components/{{camelCase name}}/{{pascalCase name}}.test.tsx`,
					templateFile: 'generatorTemplates/component/Component.test.js.hbs',
				},
			];

			if (isCssModules) {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/ts/components/{{camelCase name}}/{{pascalCase name}}.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'add',
						path: `${rootDirectory}/ts/components/{{camelCase name}}/{{pascalCase name}}.scss.d.ts`,
						templateFile: 'generatorTemplates/component/Component.scss.d.ts.hbs',
					}
				);
			} else {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/scss/components/_{{dashCase name}}.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'append',
						path: `${rootDirectory}/scss/_components.scss`,
						pattern: `/* PLOP_INJECT_IMPORT */`,
						template: `@import 'components/{{dashCase name}}';`,
					}
				);
			}

			return actionsList;
		},
	});

	plop.setGenerator('page', {
		description: 'Create a page',
		prompts: [createQuestion('page')],
		actions: function () {
			let actionsList = [
				{
					type: 'add',
					path: `${rootDirectory}/ts/containers/pages/{{camelCase name}}Page/{{pascalCase name}}Page.tsx`,
					templateFile: 'generatorTemplates/page/Page.js.hbs',
					data: { isCssModules },
				},
				{
					type: 'add',
					path: `${rootDirectory}/ts/containers/pages/{{camelCase name}}Page/{{pascalCase name}}Page.test.tsx`,
					templateFile: 'generatorTemplates/page/Page.test.js.hbs',
				},
			];

			if (isCssModules) {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/ts/containers/pages/{{camelCase name}}Page/{{pascalCase name}}Page.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'add',
						path: `${rootDirectory}/ts/containers/pages/{{camelCase name}}Page/{{pascalCase name}}Page.scss.d.ts`,
						templateFile: 'generatorTemplates/component/Component.scss.d.ts.hbs',
					}
				);
			} else {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/scss/containers/pages/_{{dashCase name}}.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'append',
						path: `${rootDirectory}/scss/_containers.scss`,
						pattern: `/* PLOP_INJECT_IMPORT */`,
						template: `@import 'containers/pages/{{dashCase name}}';`,
					}
				);
			}

			return actionsList;
		},
	});

	plop.setGenerator('container', {
		description: 'Create a container',
		prompts: [createQuestion('container')],
		actions: function () {
			let actionsList = [
				{
					type: 'add',
					path: `${rootDirectory}/ts/containers/{{camelCase name}}/{{pascalCase name}}.tsx`,
					templateFile: 'generatorTemplates/component/Component.js.hbs',
					data: { isCssModules },
				},
				{
					type: 'add',
					path: `${rootDirectory}/ts/containers/{{camelCase name}}/{{pascalCase name}}.test.tsx`,
					templateFile: 'generatorTemplates/component/Component.test.js.hbs',
				},
			];

			if (isCssModules) {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/ts/containers/{{camelCase name}}/{{pascalCase name}}.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'add',
						path: `${rootDirectory}/ts/containers/{{camelCase name}}/{{pascalCase name}}.scss.d.ts`,
						templateFile: 'generatorTemplates/component/Component.scss.d.ts.hbs',
					}
				);
			} else {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/scss/containers/_{{dashCase name}}.scss`,
						templateFile: 'generatorTemplates/component/Component.scss.hbs',
					},
					{
						type: 'append',
						path: `${rootDirectory}/scss/_containers.scss`,
						pattern: `/* PLOP_INJECT_IMPORT */`,
						template: `@import 'containers/{{dashCase name}}';`,
					}
				);
			}

			return actionsList;
		},
	});

	plop.setGenerator('hook', {
		description: 'Create a custom react hook',
		prompts: [createQuestion('hook')],
		actions: [
			{
				type: 'add',
				path: `${rootDirectory}/ts/customHooks/{{camelCase name}}.ts`,
				templateFile: 'generatorTemplates/hook.js.hbs',
			},
		],
	});

	plop.setGenerator('service', {
		description: 'Create a service',
		prompts: [createQuestion('service')],
		actions: [
			{
				type: 'add',
				path: `${rootDirectory}/ts/services/{{pascalCase name}}Service.ts`,
				templateFile: 'generatorTemplates/service/Service.js.hbs',
			},
			{
				type: 'add',
				path: `${rootDirectory}/ts/services/HttpService.ts`,
				templateFile: 'generatorTemplates/service/HttpService.js.hbs',
				skipIfExists: true,
			},
		],
	});

	plop.setGenerator('reducer', {
		description: 'Create a reducer',
		prompts: createQuestion('reducer'),
		actions: function (data) {
			let actionsList = [
				{
					type: 'add',
					path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/actions/{{pascalCase name}}Actions.ts`,
					templateFile: 'generatorTemplates/reducer/Actions.js.hbs',
				},
				{
					type: 'add',
					path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/reducers/{{pascalCase name}}Reducer.ts`,
					templateFile: 'generatorTemplates/reducer/Reducer.js.hbs',
				},
				{
					type: 'add',
					path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/selectors/{{pascalCase name}}Selectors.ts`,
					templateFile: 'generatorTemplates/reducer/Selectors.js.hbs',
				},
				{
					type: 'append',
					path: `${rootDirectory}/ts/store/rootReducer.ts`,
					pattern: `/* PLOP_INJECT_IMPORT */`,
					template: `import {{camelCase name}} from './{{camelCase reducerEntity}}/reducers/{{pascalCase name}}Reducer';`,
				},
				{
					type: 'append',
					path: `${rootDirectory}/ts/store/rootReducer.ts`,
					pattern: `/* PLOP_INJECT_REDUCER_SLICE */`,
					template: `{{camelCase name}},`,
				},
			];

			//if store entity (directory) exists
			if (isStoreEntityExist(data.reducerEntity)) {
				actionsList.push(
					{
						type: 'append',
						path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ActionTypes.ts`,
						pattern: `/* PLOP_INJECT_ACTION_TYPE */`,
						template: `TEST_ACTION = '[{{pascalCase name}}] TEST_ACTION',`,
					},
					{
						type: 'append',
						path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ActionsInterfaces.ts`,
						pattern: `/* PLOP_INJECT_ACTION_INTERFACE */`,
						template: `
						interface TestAction {
							type: {{pascalCase reducerEntity}}ActionTypes.TEST_ACTION;
						}
						`,
					},
					{
						type: 'append',
						path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ActionsInterfaces.ts`,
						pattern: `/* PLOP_INJECT_ACTION */`,
						template: `TestAction |`,
					},
					{
						type: 'append',
						path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ReducersInterfaces.ts`,
						pattern: `/* PLOP_INJECT_REDUCER_INTERFACE */`,
						template: `
						export interface {{pascalCase name}}ReducerInitialState {
							testString: string;
						}
						`,
					}
				);
			} else {
				actionsList.push(
					{
						type: 'add',
						path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ActionTypes.ts`,
						templateFile: 'generatorTemplates/reducer/ActionTypes.js.hbs',
					},
					{
						type: 'add',
						path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ActionsInterfaces.ts`,
						templateFile: 'generatorTemplates/reducer/ActionsInterfaces.js.hbs',
					},
					{
						type: 'add',
						path: `${rootDirectory}/ts/store/{{camelCase reducerEntity}}/{{pascalCase reducerEntity}}ReducersInterfaces.ts`,
						templateFile: 'generatorTemplates/reducer/ReducersInterfaces.js.hbs',
					}
				);
			}

			return actionsList;
		},
	});
};
