import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 用于解析node模块，可以让Rollup打包时使用Node.js模块（包括外部依赖），而不仅仅是ES模块
import serve from 'rollup-plugin-serve'; // 构建本地服务器
import commonjs from '@rollup/plugin-commonjs'; // 将CommonJS模块转换为rollup支持的ES模块

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
        commonjs(),
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

