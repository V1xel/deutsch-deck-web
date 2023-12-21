import * as webpack from 'webpack';
import { config } from 'dotenv'

let customEnvConfig = config().parsed || {};

function stringifyValues(object = {}) {
    return Object.entries(object).reduce(
        (acc, curr) => ({ ...acc, [`${curr[0]}`]: JSON.stringify(curr[1]) }),
        {}
    );
}

customEnvConfig = { ...stringifyValues(process.env), ...stringifyValues(customEnvConfig) };

export default (
    config: webpack.Configuration
) => {
    if (config.module &&
        config.resolve &&
        config.resolve.extensions &&
        config.module.rules) {
        config.module.rules.push(
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: '@graphql-tools/webpack-loader',
            }
        )
        config.resolve.extensions.push('.graphql')
    }

    if (config.resolve &&
        config.plugins) {
        config.plugins.push(new webpack.DefinePlugin({ 'process.env': customEnvConfig }))
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
    }

    return config;
};
