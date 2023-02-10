import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/bin',
    // mkdist builder transpiles file-to-file keeping original sources structure
    {
      builder: 'mkdist',
      input: './src/json',
      outDir: './lib/json',
    },
  ],
  outDir: 'lib',
  declaration: false,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
