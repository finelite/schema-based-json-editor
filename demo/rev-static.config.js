module.exports = {
  inputFiles: [
    'demo/**/*.bundle-*.js',
    'demo/**/*.*.bundle-*.js',
    'demo/**/index.ejs.html'
  ],
  revisedFiles: [
    'demo/**/*.bundle-*.js',
    'demo/**/*.*.bundle-*.js'
  ],
  outputFiles: file => file.replace('.ejs', ''),
  json: false,
  ejsOptions: {
    rmWhitespace: true
  },
  sha: 256,
  customNewFileName: (filePath, fileString, md5String, baseName, extensionName) => baseName + '-' + md5String + extensionName,
  base: 'demo',
  fileSize: 'demo/file-size.json'
}
