const {algorythmRle} = require('./algorythmRle.js');
let fs = require('fs')

const encodingСommand = "encode";
const decodingCommand = "decode";

let report = [];
let countFailure = 0;

let argument;
let value;	



// ------------------------------------ TestCases: ------------------------------------

argument = ``;
value = ``;
test('Empty line', argument).toBe(value);

argument = "#";
value = `#${toChar(0)}#`;
test('One cage', argument).toBe(value);

argument = "##";
value = `#${toChar(1)}#`;
test('Two cages', argument).toBe(value);

argument = "###";
value = `#${toChar(2)}#`;
test('Three cages', argument).toBe(value);

argument = "####";
value = `#${toChar(3)}#`;
test('Four cages', argument).toBe(value);

argument = "A".repeat(259);
value = `#${toChar(255)}A`;
test('Checking the shift by 4 (not the cage)', argument).toBe(value);

argument = `Priv${"e".repeat(65)}t, I wait you here t${'o'.repeat(69)} l${'o'.repeat(38)}ng`;
value = `Priv#${toChar(61)}et, I wait you here t#${toChar(65)}o l#${toChar(34)}ong`;
test('Privet, I wait you here too long', argument).toBe(value);

argument = "#".repeat(36);
value = `#${toChar(35)}#`;
test('Thirty six \'#\'', argument).toBe(value);

argument = `a${'b'.repeat(823)}#cc${'e'.repeat(513)}f####`
value = `a#${toChar(255)}b#${toChar(255)}b#${toChar(255)}b#${toChar(42)}b#${toChar(0)}#cc#${toChar(255)}e#${toChar(250)}ef#${toChar(3)}#`
test('Long line', argument).toBe(value);

// ------------------------------------------------------------------------------------




function toChar(n) { 
	return String.fromCharCode(n);
}


function test(testName, input) {
	return {
		toBe: exp => {
			let result;
			
			// Encode Test
			report.push(`${testName} (${encodingСommand}):`);
			result = algorythmRle(encodingСommand, input);
			if (result == exp) {
				report.push(`\tSuccess!`);
			} else {
				report.push(`\tFailed! Value is '${result}', but expectation is '${exp}'.`);
				countFailure += 1;
			}
			
			// Decode Test
			report.push(`${testName} (${decodingCommand}):`);
			result = algorythmRle(decodingCommand, exp);
			if (result == input) {
				report.push('\tSuccess!');
			} else {	
				report.push(`\tFailed! Value is '${result}', but expectation is '${input}'.`);
				countFailure += 1;
			}
		}
	}
}


fs.writeFile('testsReport.txt', report.join('\n'), (err) => {
		if (err){
			console.err(err);
			return;
		}
		console.log(`The tests are finished! Failed tests: ${countFailure}.`);
		console.log('Read more in testsReport.txt');
	});
