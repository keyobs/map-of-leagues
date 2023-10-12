import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: 'https://keyobs.github.io/map-of-leagues/',
    resolve: {
        alias: {
            '@assets': path.resolve(projectRootDir, './src/assets'),
            '@components': path.resolve(projectRootDir, './src/components'),
            '@pages': path.resolve(projectRootDir, './src/pages'),
            '@templates': path.resolve(projectRootDir, './src/templates'),
            '@api': path.resolve(projectRootDir, './src/api'),
        },
    },
    build: {
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString();
                    }
                },
            },
        },
    },
});