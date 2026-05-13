import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'path';
export default defineConfig({
    plugins: [
        react(),
        vanillaExtractPlugin()
    ],
    resolve: {
        alias: {
            '@theme': path.resolve(__dirname, './src/design-system'),
            '@components': path.resolve(__dirname, './src/components'),
            '@': path.resolve(__dirname, './src'),
        },
    },
});
