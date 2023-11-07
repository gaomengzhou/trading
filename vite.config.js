import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
import DefineOptions from 'unplugin-vue-define-options/vite';
import {visualizer} from 'rollup-plugin-visualizer';
import legacy from '@vitejs/plugin-legacy';
import viteCompression from 'vite-plugin-compression';

const title = process.env.VITE_APP__TITLE
const isVisualizer = process.env.VISUALIZER === 'show'
export default defineConfig({
    base: '/syn/',  //H5打包用
    // base: './', // APP打包用
    plugins: [
        vue(),
        viteCompression({
            filter:/.(js|mjs|json|css|scss|sass|less|html|vue|ts)$/i,
            verbose: true,
            disable: false,
            deleteOriginFile:true,
            threshold: 102400000,
            algorithm: 'gzip',
            ext: '.gz',
        }),
        Components({
        resolvers: [VantResolver()],
        }),
        DefineOptions(),
        isVisualizer && visualizer({gzipSize: true}),
        visualizer({open: true}),
        legacy({
        targets: ['defaults', 'not IE 11'],
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/css/variable.scss";`
            },
        }
    },
    server: {
        open: true, port: 333, hmr: true, host: '0.0.0.0', proxy: {
            "/api": {
                target: "https://sjiepc.com", // target: "http://198.13.39.109:8081",
                changeOrigin: true, // rewrite: (path) => path.replace(/^\/wap/, ""),
                secure: false
            },
        },
    },
    resolve: {
        dedupe: ['vue'],
        alias: {
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            "~": path.resolve(__dirname, './'),
            "@": path.resolve(__dirname, 'src'),
        },
    },
    build: {
        assetsDir: "static",
        terserOptions:{
            compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true,
            },
        },
        //   关闭文件计算
        reportCompressedSize: false,
        //   关闭生成map文件 可以达到缩小打包体积
        sourcemap: false, // 这个生产环境一定要关闭，不然打包的产物会很大
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, "index.html"),
            },
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString();
                    }
                },
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: "js/[name]-[hash].js",
                assetFileNames: "[ext]/[name]-[hash].[ext]"
            },
        },
    },
    externals: ['vue']
})
