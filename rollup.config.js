export default {
  input: "lib/sgv-property-decorator.js",
  output: {
    file: "lib/sgv-property-decorator.umd.js",
    format: "umd",
    name: "SGVPropertyDecorator",
    globals: {
      vue: "Vue",
      "vue-class-component": "VueClassComponent",
    },
    exports: "named",
  },
  external: ["vue", "vue-class-component", "reflect-metadata"],
};
