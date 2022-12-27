import * as vscode from "vscode";
import { Configuration, OpenAIApi } from "openai";

/**
 * Opens an untitled file with some initial content.
 * @param language The language of the text file.
 * @param content The content of the text file.
 */
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
  // Get selected text editors
  const selectionTextEditor = vscode.window.activeTextEditor?.selection;
  const apiKey = vscode.workspace
    .getConfiguration()
    .get("OpenAiDocs.apiKey") as string;

  // Get temperature from settings
  const temperature = vscode.workspace
    .getConfiguration()
    .get("OpenAiDocs.temperature") as number;

  //Get maxTokens from settings
  const max_tokens = vscode.workspace
    .getConfiguration()
    .get("OpenAiDocs.max_tokens") as number;

  // Configuration for OpenAI api
  const configuration = new Configuration({ apiKey });

  // Register this command
  let disposable = vscode.commands.registerCommand(
    "documentation-openai-extension.document",
    async () => {
      // Ensure apiKey is set in settings
      if (!apiKey) {
        return vscode.window.showInformationMessage(
          "Please set your OpenAI API Key in settings"
        );
      }

      vscode.window.showInformationMessage(
        "Loading response... This can take a while"
      );

      // Call the OpenAi API
      const editor = vscode.window.activeTextEditor;
      const input = editor && editor.document.getText(selectionTextEditor);
      const openai = new OpenAIApi(configuration);
      const response = await openai.createEdit({
        model: "code-davinci-edit-001",
        instruction: "Create documentation of this code\n",
        input,
        temperature,
      });

      // Show the response
      if (response.data.choices[0].text) {
        openInUntitled(response.data.choices[0].text);
      }
    }
  );
  let disposable2 = vscode.commands.registerCommand(
    "documentation-openai-extension.explain",
    async () => {
      // Ensure apiKey is set in settings
      if (!apiKey) {
        return vscode.window.showInformationMessage(
          "Please set your OpenAI API Key in settings"
        );
      }

      vscode.window.showInformationMessage(
        "Loading response... This can take a while"
      );

      // Call the OpenAi API
      const editor = vscode.window.activeTextEditor;
      const input = editor && editor.document.getText(selectionTextEditor);
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "What does this code?\n" + input,
        temperature,
        max_tokens,
      });

      // Show the response
      if (response.data.choices[0].text) {
        openInUntitled(response.data.choices[0].text);
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
}

export function deactivate() {}
