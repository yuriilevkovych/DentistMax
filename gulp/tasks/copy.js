import gulp from 'gulp';

import { filePaths } from '../config/paths.js';
import { logger } from "../config/logger.js";

const copyStaticImg = () => {
  return gulp.src(filePaths.src.staticImages)
    .pipe(logger.handleError('COPY'))
    .pipe(gulp.dest(filePaths.build.staticImages));
}

const copyStaticCss = () => {
  return gulp.src(filePaths.src.staticCss)
    .pipe(logger.handleError('COPY'))
    .pipe(gulp.dest(filePaths.build.staticCss));
}

const copyStaticLib = () => {
  return gulp.src(filePaths.src.staticLib)
    .pipe(logger.handleError('COPY'))
    .pipe(gulp.dest(filePaths.build.staticLib));
}

const copyStaticDocs = () => {
  return gulp.src(filePaths.src.staticDocs)
    .pipe(logger.handleError('COPY'))
    .pipe(gulp.dest(filePaths.build.staticDocs));
}

const copy = async () => {
  await copyStaticImg();
  await copyStaticCss();
  await copyStaticLib();
  await copyStaticDocs();
  return true;
};

export { copy };