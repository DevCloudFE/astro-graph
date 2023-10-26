import typescript from "@rollup/plugin-typescript";
import multi from "@rollup/plugin-multi-entry";

export default {
	input: ["plugins/**/*.ts"],
	output: [
		{
			dir: "javascript/plugins",
			format: "cjs",
			preserveModules: true,
			preserveModulesRoot: "javascript",
		}
	],
	plugins: [
		multi({ preserveModules: true }),
		typescript({ tsconfig: "./tsconfig.json" })
	]
}