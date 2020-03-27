import md5 from 'md5';
import { publicApiKey } from '@config/general';

export const makeUrl = (path) => {
	const baseUrl = 'https://gateway.marvel.com/v1/public/';
	const timestamp = 1;
	const hash = md5(`${timestamp}${process.env.REACT_APP_PRIVATE_APIKEY}${publicApiKey}`);
	const str = `${baseUrl}${path}?ts=${timestamp}&apikey=${publicApiKey}&hash=${hash}`;

	return str;
};

export const renderDescription = (text) => {
	if (!text) return 'No description 😢';

	if (text.length > 130) return `${text.substring(0, 130)}...`;

	return text;
};

export const favoriteHandle = (type, setIsFavorite, isFavorite, id) => () => {
	const stringIds = localStorage.getItem(type);

	if (isFavorite) {
		const ids = JSON.parse(stringIds);
		const index = ids.findIndex((el) => el === id);
		ids.splice(index, 1);

		localStorage.setItem(type, JSON.stringify(ids));
		setIsFavorite(false);
	} else if (stringIds) { // no es favorito pero si existen favoritos
		const ids = JSON.parse(stringIds);

		if (Array.isArray(ids)) {
			ids.push(id);

			localStorage.setItem(type, JSON.stringify(ids));
			setIsFavorite(true);
		} else {
			localStorage.setItem(type, JSON.stringify([id]));
			setIsFavorite(true);
		}
	} else {
		localStorage.setItem(type, JSON.stringify([id]));
		setIsFavorite(true);
	}
};

export const getFavorite = (type, setIsFavorite, id) => {
	const stringIds = localStorage.getItem(type);
	if (stringIds) {
		const ids = JSON.parse(stringIds);

		if (Array.isArray(ids) && ids.includes(id)) {
			setIsFavorite(true);
		}
	}
};
