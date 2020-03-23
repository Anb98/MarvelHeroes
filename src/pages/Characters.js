import React, { useEffect } from 'react';


import useDataApi from '@hooks/useDataApi';
import { makeUrl } from '@config/util';
import { Pagination } from 'antd';

const Characters = () => {
	const [characterState, fetchData] = useDataApi(makeUrl('characters'));

	const onChange = (page, pageSize) => {
		const offset = (page - 1) * pageSize;
		fetchData({
			params: {
				offset,
				limit: pageSize,
			},
		});
	};

	const getCharacter = async () => {
		fetchData();
	};

	useEffect(() => {
		// getCharacter();
	}, []);

	useEffect(() => {
		if (characterState.isSuccess) { console.log('characterState.data :', characterState.data); }
	}, [characterState.isSuccess]);


	return (
		<div className='App'>
			Characters
			<Pagination
				onChange={onChange}
				onShowSizeChange={onChange}
				total={50}
				showSizeChanger
			/>
		</div>
	);
};

export default Characters;
