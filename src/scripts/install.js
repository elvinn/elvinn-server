const fs = require('fs');
const path = require('path');
const ora = require('ora');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

/**
 * 对于给定的目录，安装依赖
 * @param {string} aimDir 相对路径
 */
const installDir = async (aimDir) => {
  const cwd = path.join(process.cwd(), aimDir);
  const { error, stdout, stderr } = await exec('yarn install --frozen-lockfile', { cwd }).catch((throwError) => {
    return { error: throwError, stdout: '', stderr: '' };
  });

  const isOk = !error;
  if (isOk) {
    console.log(`\n${path.basename(cwd)} 安装成功`);
  } else {
    console.error(`\n${path.basename(cwd)} 安装失败 \n${error} \n${stderr} \n${stdout}`);
  }

  return {
    isOk,
    errMessage: stderr,
    aimDir,
  };
};

/**
 * 对于给定的目录，遍历其子目录，分别安装依赖
 * @param {string} aimDir 相对路径
 */
async function installSubDir(aimDir) {
  const cwd = path.join(process.cwd(), aimDir);
  const fileList = await fs.promises.readdir(cwd, { withFileTypes: true });
  const taskList = fileList
    .map((file) => {
      if (!file.isDirectory()) {
        return null;
      }
      return installDir(path.join(aimDir, file.name));
    })
    .filter((task) => task);

  const spinner = ora(`${taskList.length} 个目录安装依赖中...`).start();
  const resultList = await Promise.allSettled(taskList);
  const failedNum = resultList.reduce((accumulator, result) => {
    const { status, value: { isOk } = {} } = result;

    if (status === 'fulfilled' && isOk) {
      return accumulator;
    }
    return accumulator + 1;
  }, 0);

  if (failedNum > 0) {
    spinner.fail(`${failedNum} 个目录安装失败（${failedNum} / ${taskList.length}）`);
    return;
  }

  spinner.succeed(`${taskList.length} 个目录安装成功`);
}

module.exports = {
  installDir,
  installSubDir,
};
