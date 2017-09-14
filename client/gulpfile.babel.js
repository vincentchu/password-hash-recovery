// @flow
import { exec } from 'child_process'
import path from 'path'
import gulp from 'gulp'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './project/webpack.config.babel'

const resolve = (file: string) => path.resolve(__dirname, file)

gulp.task('buildjs', (cb) => webpack(webpackConfig, cb))

gulp.task('watch:webpack', () => {
  gulp.watch('src/**/*', { debounceDelay: 10 }, [ 'build' ])
})

gulp.task('runServer', () => {
  const server = new WebpackDevServer(
    webpack({ ...webpackConfig, bail: false }),
    webpackConfig.devServer
  )

  server.listen(9898, 'localhost', (err) => {
    if (!err) {
      console.log('Listening at localhost:9898')
    } else {
      console.error(`webpack-dev-server failed to start: ${err}`)
    }
  })
})

gulp.task('copyRoot', (cb) => {
  const src = resolve('project/root.html')
  const dest = resolve('build/index.html')

  exec(`cp ${src} ${dest}`, cb)
})

gulp.task('run', [ 'copyRoot', 'runServer' ])
gulp.task('build', [ 'copyRoot', 'buildjs' ])

gulp.task('default', [ 'build' ])
