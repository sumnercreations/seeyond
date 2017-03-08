module.exports = {
  staticFileGlobs: [
      'dist/**.html',
      'dist/**.js',
      'dist/**.css',
      'dist/assets/features.json',
      'dist/assets/icons/*',
      'dist/assets/images/features/*',
      'dist/assets/images/materials/*',
      'dist/assets/images/patterns/*',
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  navigateFallback: '/index.html'
};
