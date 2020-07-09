import json from 'rollup-plugin-json';

export default {
  input: 'core/index.js',
  output: {
    file: 'bundle.js',
  },
  plugins: [json()]
};