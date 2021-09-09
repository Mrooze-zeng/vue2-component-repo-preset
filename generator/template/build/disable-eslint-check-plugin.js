module.exports = class DisableEslintCheckPlugin {
  constructor(options = { words: "/* eslint-disable */\n", regExp: /\.js$/ }) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tap(this.constructor.name, (compilation) => {
      compilation.chunks.forEach((chunk) => {
        chunk.files.forEach((filename) => {
          if (this.options.regExp.test(filename)) {
            const source =
              this.options.words + compilation.assets[filename].source();
            compilation.assets[filename] = {
              source: function() {
                return source;
              },
              size: function() {
                return source.length;
              },
            };
          }
        });
      });
    });
  }
};
