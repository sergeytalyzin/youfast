const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    webpack: {
        configure: (webpackConfig) => {
            if (webpackConfig.mode === 'development') {
                webpackConfig.devtool = 'source-map'; // Включаем исходные карты
            }

            return webpackConfig;
        },
    },
};
