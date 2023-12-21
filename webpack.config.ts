import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';

let customEnvConfig = require('dotenv')?.config()?.parsed || {};

function stringifyValues(object = {}) {
    return Object.entries(object).reduce(
        (acc, curr) => ({ ...acc, [`${curr[0]}`]: JSON.stringify(curr[1]) }),
        {}
    );
}

customEnvConfig = { ...stringifyValues(process.env), ...stringifyValues(customEnvConfig) };

export default (
    config: webpack.Configuration,
    options: CustomWebpackBrowserSchema,
    targetOptions: TargetOptions
) => {
    config.module?.rules?.push(
        {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: '@graphql-tools/webpack-loader',
        }
    )

    config.resolve?.extensions?.push('.graphql')
    config.plugins?.push(new webpack.DefinePlugin({ 'process.env': customEnvConfig }))
    if (config.resolve)
        config.resolve.fallback = {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "os": false,
            "crypto-browserify": false,
        }

    return config;
};