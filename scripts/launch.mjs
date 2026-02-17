/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-02-17 10:43:35
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-02-17 11:05:00
 */
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import packageJson from '../package.json' assert { type: 'json' };

const standalone = process.argv.includes('--standalone');
const angularJsonPath = path.resolve(process.cwd(), 'angular.json');
const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));

const projectName = packageJson.name;
const buildConfig = angularJson.projects[projectName].architect.build;
const serveConfig = angularJson.projects[projectName].architect.serve;

// 针对不同的模式更新 angular.json 中的配置
if (standalone) {
  buildConfig.options.main = 'src/main.ts';
  buildConfig.options.customWebpackConfig = undefined;
  buildConfig.options.deployUrl = undefined;

  serveConfig.options.port = packageJson.ports.standalone;
} else {
  buildConfig.options.main = 'src/main.single-spa.ts';
  buildConfig.options.customWebpackConfig = {
    path: 'config/extra-webpack.config.js',
    libraryName: 'micro-angular',
    libraryTarget: 'umd',
  };
  buildConfig.options.deployUrl = `http://localhost:${packageJson.ports.micro}/`;

  serveConfig.options.port = packageJson.ports.micro;
}

fs.writeFileSync(
  angularJsonPath,
  JSON.stringify(angularJson, null, 2),
  'utf-8',
);

console.log(
  chalk.green(
    `\nSuccessfully switched to ${standalone ? 'standalone' : 'micro-frontend'} mode!\n`,
  ),
);

execSync(`npx prettier --write ${angularJsonPath}`, { stdio: 'inherit' });
