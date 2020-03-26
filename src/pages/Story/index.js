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
			dataIndex: 'title',
			render: (text, record) => (
				<FirstColumn to={`/stories/${record.id}`}>
					{text}
				</FirstColumn>
			),
		},
		{
			title: 'Original issue',
			dataIndex: 'originalIssue',
			render: (text) => {
				if (!text?.name) return 'No original issue 😢';

				if (text?.name?.length > 130) return `${text?.name?.substring(0, 130)}...`;

				return text?.name;
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
				title='Stories'
				loading={storiesState.isLoading}
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
	word-wrap: break-word;
	font-weight:bold;
	color: var(--text-color);
	&:hover{
		text-decoration:underline;
	}
`;


export default Stories;
