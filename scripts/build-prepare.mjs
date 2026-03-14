import chalk from 'chalk';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// 设置 .env 文件路径并加载环境变量
const envPath = path.resolve(process.cwd(), 'config/.env');
dotenv.config({ path: envPath });

// 获取部署路径
const deployUrl = process.env.DEPLOY_URL || 'http://localhost:8001/';

// 修改 angular.json 中的 deployUrl
const angularJsonPath = path.resolve(process.cwd(), 'angular.json');
const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));
angularJson.projects['micro-angular'].architect.build.options.deployUrl =
  deployUrl;

fs.writeFileSync(
  angularJsonPath,
  JSON.stringify(angularJson, null, 2),
  'utf-8',
);

// 格式化 angular.json 文件并输出成功信息
execSync(`npx prettier --write ${angularJsonPath}`, { stdio: 'inherit' });
console.log(
  chalk.green(
    `\nSuccessfully updated deployUrl to ${deployUrl} in angular.json!\n`,
  ),
);
