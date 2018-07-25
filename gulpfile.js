const _ = require('lodash')
const gulp = require('gulp');
const webpack = require('webpack');

const webpackCfg = require('./webpackCfg');

gulp.task('webpack:watch', (cb) => {
    let f;

    webpack(_.mergeWith({}, webpackCfg, {
      entry: [
        './src/test_plugin.js',
        './src/script.js'
      ],
      output: {
        filename: './bundle.js'
      },
    }, (o,src) => { if(_.isArray(o)) return o.concat(src) } ),
    
    (err, stats) => {
      console.log(stats.toString());
      !f && cb();
      f = true;
    });
})

gulp.task('startServer', () => {
    const path = require('path');
    const express = require('express');
    const app = express();
    const port = 1337;
    const static_path = path.join(__dirname, 'dist');

    app
        .use(express.static(static_path))
        .get('/', (req, res) => res.sendFile(static_path + '/index.html'));

    app.listen(port, (error) => {
    if (error) {
        return console.error(error);
    }

    console.info("<< ! >> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    });

});

gulp.task('start', ['startServer', 'webpack:watch'])