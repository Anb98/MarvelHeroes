import md5 from 'md5';
import { publicApiKey } from '@config/general';

export const makeUrl = (path) => {
	const baseUrl = 'https://gateway.marvel.com/v1/public/';
	const timestamp = 1;
	const hash = md5(`${timestamp}${process.env.REACT_APP_PRIVATE_APIKEY}${publicApiKey}`);
	const str = `${baseUrl}${path}?ts=${timestamp}&apikey=${publicApiKey}&hash=${hash}`;

	return str;
};
