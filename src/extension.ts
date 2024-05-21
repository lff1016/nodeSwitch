import * as vscode from 'vscode'
import { getAllNodeVersions, switchNodeVersion } from './utils'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('demo.changeNode', async () => {
      const nodeVersionList = await getAllNodeVersions()

      // 展示快捷选项
      const choses = await vscode.window.showQuickPick(nodeVersionList, {
        placeHolder: '请选择需要切换的 node 版本'
      })

      try {
        const res: any = await switchNodeVersion(choses?.label || '')
        vscode.window.showInformationMessage(res)
      } catch (error: any) {
        vscode.window.showErrorMessage(error)
      }
    })
  )
  vscode.languages.registerCompletionItemProvider
}

// This method is called when your extension is deactivated
export function deactivate() {}
