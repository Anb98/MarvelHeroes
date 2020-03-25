import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { message } from 'antd';

import StyledTable from '@components/StyledTable';
import useDataApi from '@hooks/useDataApi';
import { makeUrl } from '@config/util';

const Stories = () => {
	const [storiesState, fetchData] = useDataApi(makeUrl('stories'), undefined, true);
	const [dataTable, setDataTable] = useState({
		rows: [],
		total: 0,
	});

	const columns = [
		{
			title: 'Title',
			width: 250,
			dataIndex: 'title',
			render: (text, record) => (
				<FirstColumn
					to={`/characters?key=${record.id}`}
					url={`${record.thumbnail?.path}/portrait_small.${record.thumbnail?.extension}`}
				>
					<span className='first-column__text'>{text}</span>
				</FirstColumn>
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
		if (storiesState.isSuccess) {
			const response = storiesState.data;
			console.log('Stories -> storiesState.data', storiesState.data);

			setDataTable({
				rows: response?.data?.results || [],
				total: response?.data?.total || 0,
			});
		}

		if (storiesState.isError) {
			message.error('Oops! Something happened...');
			console.log('Error :', storiesState.error);
		}
	}, [storiesState.isSuccess]);


	return (
		<div>
			<StyledTable
				loading={storiesState.isLoading}
				title='characters'
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

const FirstColumn = styled(Link)`
	display:flex;
	cursor:pointer;
	align-items:center;

	.first-column__text {
		word-wrap: break-word;
		font-weight:bold;
	}
`;


export default Stories;
