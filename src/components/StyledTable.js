import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Table } from 'antd';

const StyledTable = ({
	title, dataSource, columns, loading,
}) => (
	<Wrapper>
		<header>
			{title}
		</header>
		<Table dataSource={dataSource} columns={columns} loading={loading} />
	</Wrapper>
);

StyledTable.defaultProps = {
	loading: false,
};

StyledTable.propTypes = {
	title: PropTypes.string.isRequired,
	dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	loading: PropTypes.bool,
};

const Wrapper = styled.div`
background: white;
border-radius: 13px;

header {
	padding: 1.25em 0 0.5em 2em;
	color:#afbed3;
}


table{
	color:black;

	& > * {
		background: white !important;
	} 
}

.ant-pagination.ant-table-pagination {
	width:100%;
	text-align: center;
}

.ant-table {
	th:first-child, td:first-child {
		padding-left:2em !important;
	}

	tbody>tr>td, th {
		border:initial;
		background:white;
	} 

	tbody>tr:hover td:first-child{
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

.ant-pagination-item-link{
	border: 0;
}

.ant-pagination-item {
	border-radius:5px;
}

`;

export default StyledTable;
