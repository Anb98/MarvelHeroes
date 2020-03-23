import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { message } from 'antd';

import StyledTable from '@components/StyledTable';
import useDataApi from '@hooks/useDataApi';
import { makeUrl } from '@config/util';

const Characters = () => {
	const [characterState, fetchData] = useDataApi(makeUrl('characters'));
	const [dataTable, setDataTable] = useState({
		rows: [],
		total: 0,
	});

	const columns = [
		{
			title: 'Name',
			width: 250,
			dataIndex: 'name',
			render: (text, record) => (
				<FirstColumn
					to={`/characters?key=${record.id}`}
					url={`${record.thumbnail?.path}/portrait_small.${record.thumbnail?.extension}`}
				>
					<div className='first-column__picture' />
					<span className='first-column__text'>{text}</span>
				</FirstColumn>
			),
		},
		{
			title: 'Description',
			dataIndex: 'description',
			render: (text) => text || 'No description 😢',
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
		if (characterState.isSuccess) {
			const response = characterState.data;
			console.log('Characters -> characterState.data', characterState.data);

			setDataTable({
				rows: response?.data?.results || [],
				total: response?.data?.total || 0,
			});
		}

		if (characterState.isError) {
			message.error('Oops! Something happened...');
			console.log('Error :', characterState.error);
		}
	}, [characterState.isSuccess]);


	return (
		<div>
			<StyledTable
				loading={characterState.isLoading}
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

	.first-column__picture {
		--size: 35px;
		width:var(--size);
		height:var(--size);
		background: url(${({ url }) => url}) no-repeat !important;
		border-radius:50%;
		border:2px solid #ffce07;
		background-size:cover !important;
		margin-right:1em;
	}

	.first-column__text {
		word-wrap: break-word;
		font-weight:bold;
	}
`;

export default Characters;
