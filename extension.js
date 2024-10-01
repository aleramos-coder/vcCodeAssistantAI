// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscodeassistant" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('vscodeassistant.helloWorld', async function () {
		let activeEditor = vscode.window.activeTextEditor

		if(activeEditor){
			let document = activeEditor.document

			let fileContent = document.getText()

			let data ={
				code : fileContent
			}

			const URL = 'http://127.0.0.1:5000/api/assistance/inline'
			try {
				let response = await fetch(URL, {
					method : 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body : JSON.stringify(data)
	
				})
				if (response.ok){
					const responseData = await response.json();
					console.log(responseData)

                    // Extract the code from the response
                    const rawResponseText = String(responseData); 
                    const codeRegex = /(.+?)(\n)/gs
                    let match = rawResponseText.match(codeRegex)
					let cleanedResponseText = rawResponseText.replace(match[0], '\n').replace(match[match.length -1], '')


                    

                    // Insert the extracted code into the active document
                    await activeEditor.edit(editBuilder => {
                        // Insert at the end of the document
                        editBuilder.insert(new vscode.Position(document.lineCount, 0), cleanedResponseText + '\n');
                    });
	
				}
			}
			catch(e){
				console.log(e)
			}
			
		}

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
