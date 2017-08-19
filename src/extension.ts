import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) 
{
    console.log('Exception Formatter Activated.');

    vscode.commands.registerCommand('extension.formatException', () => {
        const {activeTextEditor} = vscode.window;
    
        if (activeTextEditor && activeTextEditor.document.languageId === 'plaintext') {
            const {document} = activeTextEditor;
            const unformattedException = document.getText();

            const formattedException = ExceptionFormatter.format(unformattedException);

            const edit = new vscode.WorkspaceEdit();
            edit.delete(document.uri, new vscode.Range(document.positionAt(0), document.positionAt(unformattedException.length)));
            edit.insert(document.uri, document.positionAt(0), formattedException)

            return vscode.workspace.applyEdit(edit)
        }
    });
}

class ExceptionFormatter
{
    public static format(exceptionMessage: string): string{
        // Return empty string on null input.
        if(!exceptionMessage)
            return '';

        // Start off with all new lines removed.
        var result = exceptionMessage.replace(/(\r\n|\r|\n)/g, '');

        // The list of tokens to find and prepend new lines.
        var replacementTokens = [
            {
                original: /   at/g,
                replacement: '\n   at'
            },
            {
                original: /\) at /g,
                replacement: '\n at '
            },
            {
                original: /--- End of inner exception stack trace ---/g, 
                replacement: '\n   --- End of inner exception stack trace ---'
            },
            {
              original: /--->/g,
              replacement: '\n --->'
            },
            {
                // Removes extra whitespace at the end of the lines.
                original: /\s+\n/g, 
                replacement: '\n'
            },
        ]

        replacementTokens.forEach(token => {
            result = result.replace(token.original, token.replacement);
        });
    
        return result;
    };
}