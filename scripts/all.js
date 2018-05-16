import fs from 'fs';
import * as countries from '../data/iso3166';
import * as mobileData from '../data/mobile-data';

const codeGen = (alpha3, country) =>
	`export const ${alpha3} = ${JSON.stringify(country)};`;

const code = Object.entries(countries)
	.map(([alpha3, data]) => [alpha3, Object.assign(data, mobileData[alpha3])])
	.filter(([, data]) => data.countryCallingCodes)
	.map(([alpha3, data]) => {
		const countryCallingCodes = data.countryCallingCodes.map(numbers => {
			if (numbers.includes(' ')) {
				return numbers.substring(0, numbers.indexOf(' '));
			}
			return numbers;
		});
		return [alpha3, Object.assign(data, {countryCallingCodes})];
	})
	.map(([alpha3, data]) => {
		const countryCallingCodes = data.countryCallingCodes.filter(
			(item, pos, array) => array.indexOf(item) === pos,
		);
		return [alpha3, Object.assign(data, {countryCallingCodes})];
	})
	.map(([alpha3, data]) => codeGen(alpha3, data))
	.reduce((acc, line) => acc + line + '\n', '');

fs.writeFile('./src/data.js', code, err => {
	if (err) throw err;
	// eslint-disable-next-line
	console.log('The file has been saved!');
});
