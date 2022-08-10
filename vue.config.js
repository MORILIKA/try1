module.exports = {
    outputDir: "dist",
    css: {
      extract: true, // 是否要抽離 css，若為否，所有 css 都會內聯在 js 中。預設為 true
      sourceMap: process.env.VUE_APP_ENV === "prod" ? false : true // 是否要生成 sourceMap，預設為 false。建議在開發情況下打開
    },
    productionSourceMap: false, // production 環境下，是否生成 sourceMap。對 js 而言，預設為 true，建議可關閉
    publicPath: "/",
    filenameHashing: true,
    chainWebpack: config => {
      if (process.env.NODE_ENV === "prod") {
        config.output
          .filename("js/[name].[hash:8].js")
          .chunkFilename("js/[name].[hash:8].js");
        config.plugin("extract-css").tap(args => {
          args[0].filename = "css/[name].[hash:8].css";
          args[0].chunkFilename = "css/[name].[hash:8].css";
          return args;
        });
      }
    }
  };