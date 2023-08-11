module.exports = {
	env: {
		node: true,
		commonjs: true,
		es6: true
	},
	extends: ["eslint:recommended", "plugin:security/recommended", "plugin:prettier/recommended"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2023
	},
	rules: {
		"no-var": ["warn"],
		"no-console": ["off"],
		"no-unused-vars": ["off"],
		"security/detect-possible-timing-attacks": ["off"],
		"security/detect-non-literal-fs-filename": ["off"]
	}
};
