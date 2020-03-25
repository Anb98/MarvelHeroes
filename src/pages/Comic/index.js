import React, { useEffect, useState } from 'react';
import { message } from 'antd';

import FirstColumn from '@components/FirstColumn';
import StyledTable from '@components/StyledTable';
import useDataApi from '@hooks/useDataApi';
import { makeUrl } from '@config/util';


const Comics = () => {
	const [comicState, fetchData] = useDataApi(makeUrl('comics'), undefined, true);
	const [dataTable, setDataTable] = useState({
		rows: [],
		total: 0,
	});

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			render: (text, record) => (
				<FirstColumn
					href={`/comics/${record.id}`}
					avatar={`${record.thumbnail?.path}/standard_small.${record.thumbnail?.extension}`}
					title={text}
				/>
			),
		},
		{
			title: 'Description',
			dataIndex: 'description',
			render: (text) => {
				if (!text) return 'No description 😢';

				if (text.length > 130) return `${text.substring(0, 130)}...`;

				return text;
			},
		},
	];

	const onChange = (page, pageSize) => {
		const offset = (page - 1) * pageSize;
		fetchData({
			params: {
				offset,
				limit: pageSize,
			},
		});
	};


	useEffect(() => {
		onChange(1, 10);
	}, []);

	useEffect(() => {
		if (comicState.isSuccess) {
			const response = comicState.data;

			setDataTable({
				rows: response?.data?.results || [],
				total: response?.data?.total || 0,
			});
		}

		if (comicState.isError) {
			message.error('Oops! Something happened...');
			console.log('Error :', comicState.error);
		}
	}, [comicState.isSuccess, comicState.isError]);


	return (
		<div>
			<StyledTable
				loading={comicState.isLoading}
				title='Comics'
				dataSource={dataTable.rows}
				columns={columns}
				pagination={{
					onChange,
					total: dataTable.total,
					pageSize: 10,
				}}
			/>
		</div>

	);
};


export default Comics;
