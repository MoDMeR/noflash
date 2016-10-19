import browserSync from 'browser-sync'
import path from 'path'

const paths = {
  app: 'app/**/*.js',
  appEntry: 'app/index.js',
  assets: 'assets/{,*/}*',
  sass: 'sass/**/*.scss',
  sassEntry: 'sass/index.scss',
  dist: 'dist'
}

export default async function() {
  await this.start('serve')
  await this.watch(paths.app, 'buildApp')
  await this.watch(paths.sass, 'buildSass')
  await this.watch(paths.assets, 'copyAssets')
}

export async function buildApp() {
  await this
    .source(paths.appEntry)
    .rollup({
      rollup: {
        plugins: [
          require('rollup-plugin-babel')({
            presets: [
              'es2017'
            ],
            plugins: [
              'external-helpers'
            ],
            exclude: 'node_modules/**'
          }),
          require('rollup-plugin-node-resolve')(),
          require('rollup-plugin-commonjs')(),
          require('rollup-plugin-json')()
        ]
      },
      bundle: {
        moduleName: 'noflash',
        format: 'iife',
        sourceMap: true,
        sourceMapFile: path.resolve(paths.dist, 'index.js')
      }
    })
    .target(paths.dist)
}

export async function buildSass() {
  await this
    .source(paths.sassEntry)
    .sass({
      includePaths: ['sass', 'node_modules'],
      outputStyle: 'compressed'
    })
    .target(paths.dist)
}

export async function copyAssets() {
  await this
    .source(paths.assets)
    .target(paths.dist)
}

export async function serve() {
  await browserSync({
    open: false,
    notify: false,
    files: ["dist/*"],
    server: {
      baseDir: paths.dist
    }
  })
}
