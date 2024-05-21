const exec = require('child_process').exec
const sudo = require('sudo-prompt')
type VersionType = {
  label: string
  description: string
}
/**
 * 获取所有的node版本
 */
export const getAllNodeVersions = (): Promise<VersionType[]> => {
  return new Promise((resolve, reject) => {
    exec('nvm list', (err: any, stdout: any) => {
      if (!err) {
        const versions = stdout.match(/([1-9]\d|[1-9])(.([1-9]\d|\d)){2}/g)
        const currentVersion = stdout.split('\n').findIndex((item: string) => item.includes('*')) - 1
        if (versions?.length) {
          resolve(
            versions.map((item: string, index: number) => {
              return {
                label: item,
                description: index === currentVersion ? '当前版本' : ''
              }
            })
          )
        } else {
          reject('没有获取到node版本，请用 nvm 安装node')
        }
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 切换node版本
 * @param version 切换node版本号
 */
export const switchNodeVersion = (version: string) => {
  return new Promise((resolve, reject) => {
    sudo.exec(`nvm use ${version}`, (err: any, stdout: any) => {
      if (!err) {
        resolve(stdout)
      } else {
        reject(err)
      }
    })
  })
}
