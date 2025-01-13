import importToCDN from 'vite-plugin-cdn-import';

export const buildConfig = {
    cdn() {
        return importToCDN({
            prodUrl: 'https://unpkg.com/{name}@{version}/{path}',
            modules: [

            ]
        })
    },
    external: [
        'vue',
        'vue-router',
        'element-plus',
    ],
}