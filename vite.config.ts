import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
    plugins: [ react() ],
    css    : {
        modules: {
            generateScopedName: '[name]_[local]-[hash:base64:5]',
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    test   : {
        globals    : true,
        setupFiles : './jest.setup.ts',
        environment: 'jsdom',
        css        : {
            modules: {
                classNameStrategy: 'stable',
            },
        },
    },
});