import gulp from 'gulp';
import versionNumber from 'gulp-version-number';
import posthtml from 'gulp-posthtml';
import phModule from 'posthtml-modules';

import { plugins as plg } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { logger } from '../config/logger.js';
import { routes } from '../config/routes/routes.js';
import { data } from '../config/data/index.js';

const host = '="/DentistMax/dist';

const html = (isBuild, isBuildToGit) => {
  const root = filePaths.srcFolder;

  const plugins = [
    phModule({
      from: root,
      root,
      attribute: 'src',
      locals: {
        data,
        pagesRoutes: routes,
        cardActions: {
          resize: [{ type: 'resize' }],
        },
        isExist: Boolean,
        getConfig: function (config) {
          if (!config) {
            return '';
          }

          return Object.entries(config).reduce((acc, [key, value]) => {
            if (!value) {
              return acc;
            }

            const confValue =
              typeof value !== 'object'
                ? `'${String(value)}'`
                : `'${JSON.stringify(value)}'`;

            return `${acc} ${key}=${confValue}`;
          }, '');
        },
      },
      expressions: {
        missingLocal: true,
        unescapeDelimiters: ['##', '##'],
        removeScriptLocals: true,
      },
      attributeAsLocals: true,
    }),
  ];
  const options = {};

  return gulp
    .src(filePaths.src.html)
    .pipe(logger.handleError('HTML'))
    .pipe(posthtml(plugins, options))
    .pipe(
      plg.if(
        isBuild,
        versionNumber({
          value: '%DT%',

          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },

          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(plg.if(isBuildToGit, plg.replace('="/lib', `${host}/lib`)))
    .pipe(plg.if(isBuildToGit, plg.replace('="/css', `${host}/css`)))
    .pipe(plg.if(isBuildToGit, plg.replace('="/img', `${host}/img`)))
    .pipe(plg.if(isBuildToGit, plg.replace('="/pages', `${host}/pages`)))

    .pipe(plg.replace('=""=""', ''))
    .pipe(gulp.dest(filePaths.buildFolder))
    .pipe(plg.browserSync.stream());
};

export { html };
