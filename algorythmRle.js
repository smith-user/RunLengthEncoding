module.exports.algorythmRle = function (command, data) {	
	const encodingСommand = "encode";
	const decodingCommand = "decode";
	let solution;
	switch (command) {
		case encodingСommand: 
			solution = encoding(data);
			break;
		case decodingCommand:
			solution = decoding(data);
			break;
		default:
			throw new Error(`Invalid command: ${command}`);
	}
	return solution;
}

function encoding (text) {
	let code = [];
	let i = 0, n = 1;
	while (i < text.length) {
		while (text.charAt(i) == text.charAt(i + n) && 
			(n < 259 && text.charAt(i) != '#' ||  n < 256 && text.charAt(i) == '#'))
			n++;
		let newSubStr;
		if (n > 3 && text.charAt(i) != '#') {
			// Используется свдвиг на 4: n - 4
			newSubStr = `#${String.fromCharCode(n - 4)}${text.charAt(i)}`;
		} else if (text.charAt(i) == '#') {
			// Используется свдвиг на 1: n - 1
			newSubStr = `#${String.fromCharCode(n - 1)}#`;
		} else {
			newSubStr = text.charAt(i).repeat(n);
		}
		code.push(newSubStr);
		i += n;
		n = 1;
	}
	return code.join('');
}


function decoding (code) {
	let message = [];
	let i = 0, indexOfCage = 0;
	let newSubStr;
	while (i < code.length) {
		indexOfCage = code.indexOf('#', i);
		if (indexOfCage != -1) {
			newSubStr = code.substring(i, indexOfCage);
		} else {
			message.push(code.substring(i));
			break;
		}
		
		let numberOfRepeat = parseInt(code.charCodeAt(indexOfCage + 1), 10);
		if (code.charAt(indexOfCage + 2) == '#') {
			newSubStr += code.charAt(indexOfCage + 2).repeat(numberOfRepeat + 1);
		} else {
			newSubStr += code.charAt(indexOfCage + 2).repeat(numberOfRepeat + 4);
		}
		message.push(newSubStr);
		i = indexOfCage + 3;
	}
	return message.join('');
}
