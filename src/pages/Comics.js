import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { message } from 'antd';


import StyledTable from '@components/StyledTable';
import useDataApi from '@hooks/useDataApi';
import { makeUrl } from '@config/util';


const Comics = () => {
	const [comicState, fetchData] = useDataApi(makeUrl('comics'));
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
					to={`/comics?key=${record.id}`}
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
			console.log('Comics -> comicState.data', comicState.data);

			setDataTable({
				rows: response?.data?.results || [],
				total: response?.data?.total || 0,
			});
		}

		if (comicState.isError) {
			message.error('Oops! Something happened...');
			console.log('Error :', comicState.error);
		}
	}, [comicState.isSuccess]);


	return (
		<div>
			<StyledTable
				loading={comicState.isLoading}
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

	--picture-size: 35px;
	.first-column__picture {
		width:var(--picture-size);
		height:var(--picture-size);
		background: url(${({ url }) => url}) no-repeat !important;
		border-radius:50%;
		border:2px solid #ffce07;
		background-size:cover !important;
		margin-right:1em;
	}

	.first-column__text {
		word-wrap: break-word;
		font-weight:bold;
		width: calc( 100% - (var(--picture-size) + 2px + 1em ));
	}
`;


export default Comics;
