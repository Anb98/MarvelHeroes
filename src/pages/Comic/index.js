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

	const [searchFilters, setSearchFilters] = useState([]);
	const [isFiltering, setIsFiltering] = useState(false);

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
			title: 'Description',
			dataIndex: 'description',
			render: (text) => {
				if (!text) return 'No description 😢';

				if (text.length > 130) return `${text.substring(0, 130)}...`;

				return text;
			},
		},
		{
			title: 'Issue Number',
			dataIndex: 'issueNumber',
			sorter: true,
		},
		{
			title: 'Format',
			dataIndex: 'format',
			filterMultiple: false,
			filters: [
				{ text: 'Comic', value: 'comic' },
				{ text: 'Magazine', value: 'magazine' },
				{ text: 'Trade paperback', value: 'trade paperback' },
				{ text: 'Hardcover', value: 'hardcover' },
				{ text: 'Digest', value: 'digest' },
				{ text: 'Graphic novel', value: 'graphic novel' },
				{ text: 'Digital comic', value: 'digital comic' },
				{ text: 'Infinite comic', value: 'infinite comic' },
			],
		},
	];

	const handleTableChange = (pagination, filters, sorter) => {
		if (filters.format) {
			setSearchFilters(filters.format);
			setIsFiltering(Math.random());
		} else {
			setIsFiltering(false);
		}

		if (!sorter.column) {
			setIsOrdering(false);
		} else if (sorter.order) {
			// console.log('handleTableChange -> sorter.order', sorter.order);
			if (sorter.order === 'descend') {
				setIsDescOrder(true);
			} else if (sorter.order === 'ascend') {
				setIsDescOrder(false);
			}
			setIsOrdering(true);
		}
	};

	const onChange = (page, pageSize) => {
		const offset = (page - 1) * pageSize;
		setCurrentPage(page);

		fetchData({
			params: {
				offset,
				limit: pageSize,
				...isOrdering && { orderBy: isDescOrder ? '-issueNumber' : 'issueNumber' },
				...isFiltering && { format: searchFilters[0] },
			},
		});
	};

	useEffect(() => {
		onChange(currentPage, 10);
	}, [isOrdering, isDescOrder, isFiltering]);

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
				onSearch={(...rest) => console.log(rest)}
				onSelect={(...rest) => console.log(rest)}
				selectOptions={[
					{ text: 'Title', value: 'titleStartsWith' },
					{ text: 'Issue number', value: 'issueNumber' },
				]}
				table={{
					onChange: handleTableChange,
					rowKey: (record) => record.id,
					loading: comicState.isLoading,
					dataSource: dataTable.rows,
					columns,
					pagination: {
						onChange,
						total: dataTable.total,
						pageSize: 10,
					},
				}}
			/>
		</div>

	);
};


export default Comics;
