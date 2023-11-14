import fs from 'fs';
import path from 'path';
import terser from '@rollup/plugin-terser';

export default {
	input: 'javascript/src/js/mxClient.js',
	output: [
		{
			file: 'javascript/mxClient.js',
			format: 'cjs',
			strict: false
		},
		{
			file: 'javascript/mxClient.min.js',
			format: 'cjs',
			strict: false,
			plugins: [terser()]
		}
	],
	plugins: [handleDependencies()],
	treeshake: false
}

function handleDependencies() {
	return {
		name: 'handleDependencies',
		transform(content) {
			const deps = getDependencies(content);
			const combined = combineDependencies(deps);

			return combined
		}
	}
}

function getDependencies(content) {
	let deps = content
		.match(/mxClient\.include\([^"']+["'](.*?)["']/gi)
		.map(str => str.match(/mxClient\.include\([^"']+["'](.*?)["']/)[1]);
	deps = ['./js/mxClient.js'].concat(deps.slice(0));

	return deps;
}

function combineDependencies(dependencies) {
	let code = '';
	for (const file of dependencies) {
		const filePath = path.join(process.cwd(), '/javascript/src/', file);
		const content = fs.readFileSync(filePath, 'utf-8');

		code += content;
	}

	code = code.replace(/mxClient\.include\([^"']+["'](.*?)["'][)];?\n?/gi, '');

	return code;
}