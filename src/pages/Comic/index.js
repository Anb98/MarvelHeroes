/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

import FirstColumn from '@components/FirstColumn';
import StyledTable from '@components/StyledTable';
import useDataApi from '@hooks/useDataApi';
import { makeUrl } from '@config/util';


const Comics = () => {
	const [comicState, fetchData] = useDataApi(makeUrl('comics'), undefined, true);
	const [currentPage, setCurrentPage] = useState(1);
	const [isOrdering, setIsOrdering] = useState(false);
	const [isDescOrder, setIsDescOrder] = useState(false);
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
			title: 'Issue Number',
			dataIndex: 'issueNumber',
			sorter: true,
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

	const handleTableChange = (pagination, filters, sorter) => {
		if (!sorter.column) { return setIsOrdering(false); }

		// console.log('handleTableChange -> sorter.order', sorter.order);
		if (sorter.order === 'descend') {
			setIsDescOrder(true);
		} else {
			setIsDescOrder(false);
		}
		setIsOrdering(true);
	};

	const onChange = (page, pageSize) => {
		const offset = (page - 1) * pageSize;
		setCurrentPage(page);
		console.log('onChange -> offset', offset);
		console.log('onChange -> isDescOrder', isDescOrder);
		console.log('onChange -> isOrdering', isOrdering);

		fetchData({
			params: {
				offset,
				limit: pageSize,
				...isOrdering && { orderBy: isDescOrder ? '-issueNumber' : 'issueNumber' },
			},
		});
	};

	useEffect(() => {
		onChange(currentPage, 10);
	}, [isOrdering, isDescOrder]);

	useEffect(() => {
		if (comicState.isSuccess) {
			const response = comicState.data;
			console.log('Comics -> response', response);

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
				title='Comics'
				onChange={handleTableChange}
				rowKey={(record) => record.id}
				loading={comicState.isLoading}
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
