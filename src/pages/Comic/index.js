/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

import FirstColumn from '@components/FirstColumn';
import StyledTable from '@components/StyledTable';
import useDataApi from '@hooks/useDataApi';
import { makeUrl, renderDescription } from '@config/util';


const Comics = () => {
	const selectOptions = [
		{ text: 'Title', value: 'titleStartsWith' },
		{ text: 'Issue number', value: 'issueNumber' },
	];


	const [comicState, fetchData] = useDataApi(makeUrl('comics'), undefined, true);
	const [currentPage, setCurrentPage] = useState(1);

	const [filterSelected, setFilterSelected] = useState(selectOptions[0].value);
	const [filterValue, setFilterValue] = useState('');

	const [searchFilters, setSearchFilters] = useState('');
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
			render: renderDescription,
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
			if (filters.format[0] !== searchFilters) {
				setSearchFilters(filters.format[0]);
				setIsFiltering(Math.random());
			}
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

		if (!!filterValue && filterSelected === 'issueNumber' && isNaN(Number(filterValue))) {
			return message.warning('Issue number must be a number');
		}

		fetchData({
			params: {
				offset,
				limit: pageSize,
				...isOrdering && { orderBy: isDescOrder ? '-issueNumber' : 'issueNumber' },
				...isFiltering && { format: searchFilters },
				...!!filterValue && { [filterSelected]: filterValue },
			},
		});
	};

	useEffect(() => {
		onChange(1, 10);
	}, [isOrdering, isDescOrder, isFiltering, filterValue]);

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
				title='Comics'
				onSearch={(value) => setFilterValue(value)}
				onSelect={(value) => setFilterSelected(value)}
				selectOptions={selectOptions}
				table={{
					onChange: handleTableChange,
					rowKey: (record) => record.id,
					loading: comicState.isLoading,
					dataSource: dataTable.rows,
					columns,
					pagination: {
						current: currentPage,
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
