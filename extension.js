var vscode = require('vscode');
var fs = require('fs');

const smilesOptions = require('emoji-datasource').map(emoji => {
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

var pickOptions = {
  matchOnDescription: true,
  matchOnDetail: true,
  placeHolder: "Type emoji name"
}

function insertText(text) {
  var editor = vscode.window.activeTextEditor;
  editor.edit(function (editBuilder) {
    editBuilder.delete(editor.selection);
  }).then(function () {
    editor.edit(function (editBuilder) {
      editBuilder.insert(editor.selection.start, text);
    });
  });
}

function activate(context) {
  var insertEmoji = vscode.commands.registerTextEditorCommand('emoji.indertEmoji', function () {
    vscode.window.showQuickPick(smilesOptions, pickOptions).then(function (item) {
      insertText(item.label);
    });
  });

  var insertMarkdown = vscode.commands.registerTextEditorCommand('emoji.insertMarkdown', function () {
    vscode.window.showQuickPick(smilesOptions, pickOptions).then(function (item) {
      insertText(item.markdown);
    });
  });

  var insertUnicode = vscode.commands.registerTextEditorCommand('emoji.insertUnicode', function () {
    vscode.window.showQuickPick(smilesOptions, pickOptions).then(function (item) {
      insertText(item.unicode);
    });
  });

  context.subscriptions.push(insertEmoji);
  context.subscriptions.push(insertMarkdown);
  context.subscriptions.push(insertUnicode);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
