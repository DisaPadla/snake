import serve from 'rollup-plugin-serve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
  },
  plugins: [
    serve({
      open: true,
      contentBase: ['dist', 'static'],
    }),
  ],
};
