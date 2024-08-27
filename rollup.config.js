import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    input: "src/index.ts",
    output: {
        file: path.resolve(__dirname, 'dist/bundle.js'),
        sourcemap: true,
        format: 'iife'
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.ts'],
            browser: true, // 当前代码是在浏览器中使用的
        }),
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
        serve({
            open: true,
            openPage: '/public/index.html',
            port: 3000
        }),
    ]
};

