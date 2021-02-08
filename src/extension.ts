import * as vscode from 'vscode';
import * as emojiDatasource from 'emoji-datasource';

const smilesOptions = emojiDatasource.map(emoji => {
  const unicodes = emoji.unified.split('-');
  const label = String.fromCodePoint(...unicodes.map(u => Number.parseInt(u, 16)));
  const name = emoji.name || emoji.short_name.replace(/[_-]/g, ' ').toUpperCase();
  const markdown = `:${emoji.short_name}:`;
  const unicode = unicodes.map(u => (u.length === 4) ? `\\u${u}` : `\\u{${u}}`).join('');
  return {
    label,
    description: `${name} ${markdown}`,
    markdown,
    unicode,
  };
});

const pickOptions: vscode.QuickPickOptions = {
  matchOnDescription: true,
  matchOnDetail: true,
  placeHolder: "Type emoji name"
};

function insertText(text: string) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  editor.edit((editBuilder) => {
    editBuilder.delete(editor.selection);
  }).then(() => {
    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.start, text);
    });
  });
}

export const activate = (context: vscode.ExtensionContext) => {
  const insertEmoji = vscode.commands.registerTextEditorCommand('emoji.insert', () => {
    vscode.window.showQuickPick(smilesOptions, pickOptions).then((item) => {
      if (item) {
        insertText(item.label);
      }
    });
  });

  const insertMarkdown = vscode.commands.registerTextEditorCommand('emoji.insertMarkdown', () => {
    vscode.window.showQuickPick(smilesOptions, pickOptions).then((item) => {
      if (item) {
        insertText(item.markdown);
      }
    });
  });

  const insertUnicode = vscode.commands.registerTextEditorCommand('emoji.insertUnicode', () => {
    vscode.window.showQuickPick(smilesOptions, pickOptions).then((item) => {
      if (item) {
        insertText(item.unicode);
      }
    });
  });

  context.subscriptions.push(insertEmoji);
  context.subscriptions.push(insertMarkdown);
  context.subscriptions.push(insertUnicode);
};

export const deactivate = () => {
};
