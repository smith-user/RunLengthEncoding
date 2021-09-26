const { algorythmRle } = require('./algorythmRle.js');
let fs = require('fs');


let arg = process.argv;
let result;

fs.readFile(arg[3], (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	
	result = algorythmRle(arg[2], data.toString());
	
	fs.writeFile('output.txt', result, (err) => {
		if (err){
			console.err(err);
			return;
		}
		console.log('The file has been saved!');
	});
});
