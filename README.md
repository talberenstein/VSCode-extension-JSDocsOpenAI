# OpenAI Documentation Extension for VS Code

This extension allows users to generate documentation for their code using OpenAI's GPT-3 language model.

## Features

- Generate documentation for selected code by running the `Documentation: OpenAI` command
- Get an explanation of selected code by running the `Documentation: OpenAI Explain` command

## Requirements

- An OpenAI API key, which can be obtained [here](https://beta.openai.com/signup/).

## Extension Settings

This extension contributes the following settings:

- `OpenAiDocs.apiKey`: OpenAI API key.
- `OpenAiDocs.temperature`: Temperature setting for OpenAI model. Higher values will result in more creative and varied responses, while lower values will result in more predictable and accurate responses.

## Commands

- `Documentation: OpenAI`: Generate documentation for selected code.
- `Documentation: OpenAI Explain`: Get an explanation of selected code.

## Usage

1. Select the code you want to generate documentation for.
2. Run the `Documentation: OpenAI` command.
3. Wait for the response from the OpenAI API (this can take a while).
4. The documentation will be opened in a new untitled file.

To get an explanation of selected code, follow the same steps but use the `Documentation: OpenAI Explain` command instead.

## Known Issues

- The OpenAI API can be slow, so generating documentation or explanations may take a while.

## Release Notes

### 0.1.0

Now max_tokens can be dinamically changed from the settings

### 0.0.1

Initial release of the OpenAI Documentation Extension for VS Code.
