/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

import FirstColumn from '@components/FirstColumn';
import StyledTable from '@components/StyledTable';
import useDataApi from '@hooks/useDataApi';
import { makeUrl, renderDescription, getImgPath } from '@config/util';

const Characters = () => {
	const selectOptions = [
		{ text: 'Name', value: 'nameStartsWith' },
		{ text: 'Comics', value: 'comics' },
		{ text: 'Stories', value: 'stories' },
	];

	const [width, setWidth] = useState(0);
	const [characterState, fetchData] = useDataApi(makeUrl('characters'), undefined, true);

	const [filterSelected, setFilterSelected] = useState(selectOptions[0].value);
	const [filterValue, setFilterValue] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const [isDescOrder, setIsDescOrder] = useState(false);

	const [dataTable, setDataTable] = useState({
		rows: [],
		total: 0,
	});

	const columns = [
		{
			title: 'Name',
			sorter: true,
			dataIndex: 'name',
			render: (text, record) => (
				<FirstColumn
					href={`/characters/${record.id}`}
					avatar={getImgPath(`${record.thumbnail?.path}/standard_small.${record.thumbnail?.extension}`)}
					title={text}
				/>
			),
		},
		{
			title: 'Description',
			dataIndex: 'description',
			className: width < 476 && 'hidden',
			render: renderDescription,
		},
	];

	const handleTableChange = (pagination, filters, sorter) => {
		if (sorter.order === 'descend') {
			setIsDescOrder(true);
		} else {
			setIsDescOrder(false);
		}
	};

	const onChange = (page, pageSize) => {
		const offset = (page - 1) * pageSize;
		setCurrentPage(page);
		fetchData({
			params: {
				offset,
				orderBy: isDescOrder ? '-name' : 'name',
				limit: pageSize,
				...!!filterValue && { [filterSelected]: filterValue },
			},
		});
	};

	const resizeHandler = () => {
		const currentWidth = document.body.clientWidth;
		setWidth(currentWidth);
	};

	useEffect(() => {
		resizeHandler();
		window.addEventListener('resize', resizeHandler);

		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	}, []);


	useEffect(() => {
		onChange(1, 10);
	}, [isDescOrder, filterValue]);

	useEffect(() => {
		if (characterState.isSuccess) {
			const response = characterState.data;

			setDataTable({
				rows: response?.data?.results || [],
				total: response?.data?.total || 0,
			});
		}

		if (characterState.isError) {
			message.error('Oops! Something happened...');
			console.log('Error :', characterState.error);
		}
	}, [characterState.isSuccess, characterState.isError]);


	return (
		<div>
			<StyledTable
				title='Characters'
				onSearch={(value) => setFilterValue(value)}
				onSelect={(value) => setFilterSelected(value)}
				selectOptions={selectOptions}
				table={{
					onChange: handleTableChange,
					rowKey: (record) => record.id,
					loading: characterState.isLoading,
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


export default Characters;
