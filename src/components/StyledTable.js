import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Table, Input, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;


const StyledTable = ({
	title,
	onSearch,
	onSelect,
	selectOptions,
	table,
}) => (
	<Wrapper>
		<header>
			{title}
			<div className='controls'>
				{
					onSearch
				&& (
					<Search
						placeholder='Search'
						onSearch={onSearch}
						enterButton
					/>
				)
				}
				{
					selectOptions.length !== 0 && onSelect && (

						<Select
							onChange={onSelect}
							defaultValue={selectOptions[0].value}
						>
							{
								selectOptions.map((el, i) => (
									<Option key={i} value={el.value}>{el.text}</Option>

								))
							}
						</Select>
					)
				}
			</div>
		</header>
		<Table {...table} />
	</Wrapper>
);

StyledTable.defaultProps = {
	selectOptions: [],
	onSearch: false,
	onSelect: false,
};

StyledTable.propTypes = {
	title: PropTypes.string.isRequired,
	table: PropTypes.shape({
		dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
		columns: PropTypes.arrayOf(PropTypes.object).isRequired,
		loading: PropTypes.bool,
		pagination: PropTypes.object,
	}).isRequired,
	onSearch: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	onSelect: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	selectOptions: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string,
		value: PropTypes.string,
	})),
};

const Wrapper = styled.div`
background: var(--bg-color);
border-radius: 13px;

header {
	display:flex;
	flex-wrap:wrap;
	justify-content: space-between;
	padding: 1.25em 2em 0.5em 2em;
	color: var(--text-color);

	.controls{
		--border-radius:15px;
		
		display:flex;
		flex-wrap:wrap-reverse;

		
		@media (max-width: 625px) {
			margin-top:1em;
			width: 100%;
			justify-content:center;
		}

		& > span {
			width:225px;
			border-radius: var(--border-radius) !important;
		}

		& > div{
			margin-left:1em;
			width:175px;

			@media (max-width: 539px) {
				margin-left:0px;
				margin-bottom:1em;
				width:225px;
			}
		}

		.ant-input-group > .ant-input:first-child, 
		.ant-input-group-addon:first-child {
			border-top-left-radius: var(--border-radius);
			border-bottom-left-radius: var(--border-radius);
		}

		.ant-input-group-addon,
		.ant-btn.ant-input-search-button.ant-btn-primary {
			border-top-right-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
		}

		.ant-select-selector {
			border-radius: var(--border-radius) !important;
		}
	}
}


.ant-pagination.ant-table-pagination {
	width:100%;
	text-align: center;
}

.ant-table {

	.ant-table-filter-trigger-container-open,
	.ant-table-filter-trigger-container:hover{
		background: #3E325A !important;
	}

	thead th {
		&.ant-table-column-has-sorters:hover,
		&.ant-table-column-sort {
			background: #3E325A !important;
		}
	}

	th:first-child, td:first-child {
		padding-left:2em !important;
	}

	th, td {
		color: var(--text-color);
	}

	tbody>tr>td, th {
		border:initial;
		background:var(--bg-color);
	} 

	tbody>tr:hover {
		td, th {
			background: #3E325A !important;
		}

		td:first-child{
			position:relative;
			&::before {
				--size:8px;
				content:'';
				position:absolute;
				top: var(--size);
				bottom: var(--size);
				left:0px;
				width:3px;
				background:var(--main-color);
				border-radius: 0px 4px 4px 0px;
				
			}
		}
	}
}
`;

export default StyledTable;
