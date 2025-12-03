import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Compiler, Configuration, WebpackPluginInstance } from "webpack";

export default (env: any): Configuration => {
    return {
        mode: "development",
        devtool: "source-map",
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"],
        },
        entry: {
            bundle: [
                "./source/scripts/script.ts",
                "./source/styles/style.css",
            ]
        },
        output: {
            path: path.resolve(__dirname, "wwwroot/lib"),
            filename: "[name].js",
            clean: true,
        },
        optimization: {
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        cache: false,
        watchOptions: {
            ignored: [
                '**/bin',
                '**/obj',
                '**/node_modules',
                '**/wwwroot/lib'
            ],
            aggregateTimeout: 200,
            followSymlinks: true,
            poll: true,
            stdin: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 2,
                            },
                        },
                        "postcss-loader",
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            new WatchRunPlugin()
        ],
    };
};
class WatchRunPlugin {
    apply(compiler: Compiler) {
        compiler.hooks.watchRun.tap('watchRun', (comp) => {
            if (comp.modifiedFiles) {
                console.log('===============================');
                // console.log('fileTimestamps size:', comp.fileTimestamps.size);
                // console.log('fileTimestamps:', Array.from(comp.fileTimestamps).join('\n'));
                console.log('modifiedFiles size:', comp.modifiedFiles.size);
                console.log('modifiedFiles:', Array.from(comp.modifiedFiles).join('\n'));
                console.log('===============================');
            }
        });
    }
}