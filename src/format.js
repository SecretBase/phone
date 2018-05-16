import pipe from './pipe';

const trim = str => str.trim();

const removeNonDigit = str => str.replace(/\D/g, '');

export const format = pipe(trim, removeNonDigit);
