import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import postcsspxtoviewport from 'postcss-px-to-viewport'
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";

// @see: https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		base: "./",
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
		// server config
		server: {
			host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// https: false,
			// 代理跨域（mock 不需要配置，这里只是个事列）
			proxy: {
				"/api": {
					target: "https://mock.mengxuegu.com/mock/62abda3212c1416424630a45", // easymock
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		},
		// plugins
		plugins: [
			react(),
		],
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		// build configure
		build: {
			outDir: "dist",
			// esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
			minify: "esbuild",
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },

			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		},
		css: {
			postcss: {
				plugins: [
					postcsspxtoviewport({
						unitToConvert: 'px', // 要转化的单位
						viewportWidth: 1280, // UI设计稿的宽度
						unitPrecision: 6, // 转换后的精度，即小数点位数
						propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
						viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
						fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
						selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
						minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
						mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
						replace: true, // 是否转换后直接更换属性值
						exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
						// exclude: [],
						landscape: false // 是否处理横屏情况
					})
				]
			}
		},
		optimizeDeps: {
			exclude: ['electron'], // 告诉 Vite 排除预构建 electron，不然会出现 __diranme is not defined
		},
	};
});
