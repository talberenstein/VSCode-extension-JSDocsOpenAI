// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Configuration, OpenAIApi } from "openai";

async function openInUntitled(content: string, language?: string) {
  const document = await vscode.workspace.openTextDocument({
    language,
    content,
  });
  await vscode.window.showTextDocument(document, {
    viewColumn: vscode.ViewColumn.Beside,
  });
}

export async function activate(context: vscode.ExtensionContext) {
  const editor2 = vscode.window.activeTextEditor?.selection;

  console.log(
    "CONFIG=",
    vscode.workspace.getConfiguration().get('OpenAiJsDocs.apiKey')
  );
  const configuration = new Configuration({
    organization: "",
    apiKey: vscode.workspace.getConfiguration().get('OpenAiJsDocs.apiKey'),
  });
  // const res = await axios.get('https://api.openai.com/v1/completions');
  console.log(
    'Congratulations, your extension "Document-code-extension" is now active!'
  );
  let disposable = vscode.commands.registerCommand(
    "documentation-openai-extension.document",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "The response will be open in a new tab when is ready!"
      );
      const editor = vscode.window.activeTextEditor;
      const openai = new OpenAIApi(configuration);
      const response = await openai.createEdit({
        model: "code-davinci-edit-001",
        input: editor && editor.document.getText(editor2),
        instruction: "Create JSDocs of this code\n",
        temperature: vscode.workspace.getConfiguration().get('OpenAiJsDocs.temperature')
      });
      console.log(response);
      response.data.choices[0].text &&
        openInUntitled(response.data.choices[0].text);
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
