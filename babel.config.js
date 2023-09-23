const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['ie >= 11', 'last 2 versions'],
          },
          useBuiltIns: 'entry',
          corejs: '3',
        },
      ],
      ['@babel/preset-react', { runtime: hasJsxRuntime ? 'automatic' : 'classic' }],
      '@babel/preset-typescript',
    ],
    plugins = ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'];

  return {
    presets,
    plugins,
  };
};
