export const ADD_PAGE = 'ADD_PAGE';
export const ADD_RESULTS = 'ADD_RESULTS';

export default (state, action) => {
	switch (action.type) {
	case ADD_PAGE:
		return {
			...state,
			addingPage: action.payload.page,
			addingSearchValue: action.payload.searchValue,
		};
	case ADD_RESULTS:
		return {
			...state,
			[state.addingSearchValue]: {
				total: action.payload.total,
				pages: {
					...state[state.addingSearchValue].pages,
					[state.addingPage]: action.payload.rows,
				},
			},
		};
	default:
		throw new Error();
	}
};
