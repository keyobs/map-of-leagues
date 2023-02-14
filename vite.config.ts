import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@assets': path.resolve(projectRootDir, './src/assets'),
            '@components': path.resolve(projectRootDir, './src/components'),
            '@pages': path.resolve(projectRootDir, './src/pages'),
            '@templates': path.resolve(projectRootDir, './src/templates'),
        },
    },
});
