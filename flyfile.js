import browserify from 'browserify'
import browserSync from 'browser-sync'
import mkdirp from 'mkdirp-then'
import path from 'path'
import { cordova as cordovaLib } from 'cordova-lib'
import zip from 'connect-phonegap/lib/middleware/zip'

const cordova = cordovaLib.raw

const paths = {
  app: 'src/**/*.js',
  appEntry: 'src/index.js',
  assets: 'assets/{,*/}*',
  icons: 'icons/*.png',
  build: 'build',
  config: 'config.xml',
  sass: 'sass/**/*.scss',
  sassEntry: 'sass/index.scss',
  dist: 'build/www'
}

export async function build() {
  await this.start('buildApp')
  await this.start('buildSass')
  await this.start('copyConfig')
  await this.start('copyAssets')
  await this.start('copyIcons')
}

export async function buildApp() {
  await this
    .source(paths.appEntry)
    // XXX: wait for https://github.com/MadcapJake/fly-browserify/issues/8
    .filter((source, options) => {
      const compiler = browserify({
        debug: true,
        plugin: ['bundle-collapser/plugin'],
        transform: [
          ['unassertify', { global: true }],
          [ 'uglifyify', { global: true }],
          ['babelify', {
            presets: ['es2015'],
            plugins: ['root-import']
          }]
        ]
      })

      return new Promise((resolve, reject) => {
        this.unwrap(files => {
          files.forEach(file => compiler.add(file))
          compiler.bundle((err, buf) => {
            if (err) {
              reject(err.message)
            }
            else {
              resolve(buf.toString())
            }
          })
        })
      })
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

export async function clean() {
  await this
    .clear(paths.build)
}

export async function copyAssets() {
  await this
    .source(paths.assets)
    .target(paths.dist)
}

export async function copyConfig() {
  await this
    .source(paths.config)
    .target(paths.build)
}

export async function copyIcons() {
  await this
    .source(paths.icons)
    .target(paths.build)
}

export async function serve() {
  await browserSync({
    open: false,
    notify: false,
    files: [paths.dist],
    server: {
      baseDir: paths.dist
    },
    middleware: [(req, res, next) => {
      // XXX: waiting https://github.com/phonegap/connect-phonegap/issues/96
      if (0 === req.url.indexOf('/__api__/appzip')) {
        process.chdir(paths.build)
        res.on('finish', () => process.chdir(__dirname))
        zip({})(req, res)
      }
      else {
        next()
      }
    }]
  })
}

export async function runAndroid() {
  await this.start('build')
  process.chdir(paths.build)
  await cordova.run({ platforms: ['android']})
  process.chdir(__dirname)
}

export async function runIos() {
  await this.start('build')
  process.chdir(paths.build)
  await cordova.run({ platforms: ['ios'], options: { target: 'iPhone-6' }})
  process.chdir(__dirname)
}

export async function setup() {
  await this.start('copyConfig')
  await mkdirp(paths.dist)
  process.chdir(paths.build)
  await cordova.platform('add', ['android', 'ios'])
  await cordova.plugin('add', 'cordova-plugin-headercolor')
  await cordova.plugin('add', 'cordova-plugin-insomnia')
  await cordova.plugin('add', 'cordova-plugin-statusbar')
  await cordova.plugin('add', 'cordova-plugin-whitelist')
  process.chdir(__dirname)
}

export default async function() {
  await this.start('serve')
  await this.watch(paths.app, 'buildApp')
  await this.watch(paths.config, 'copyConfig')
  await this.watch(paths.sass, 'buildSass')
  await this.watch(paths.assets, 'copyAssets')
}
