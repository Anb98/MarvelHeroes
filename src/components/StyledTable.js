import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Table } from 'antd';

const StyledTable = ({
	title, dataSource, columns, loading,
	pagination,
}) => (
	<Wrapper>
		<header>
			{title}
		</header>
		<Table
			dataSource={dataSource}
			columns={columns}
			loading={loading}
			pagination={pagination}
		/>
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
--bg-color:#4E416D;
--text-color: #afbed3;
background: var(--bg-color);
border-radius: 13px;

header {
	padding: 1.25em 0 0.5em 2em;
	color: var(--text-color);
}


.ant-pagination.ant-table-pagination {
	width:100%;
	text-align: center;
}

.ant-table {
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

.ant-pagination-item-link{
	border: 0;
	background:#4E416D;
}

.ant-pagination-item {
	opacity:0.6;
	border:0;
	border-radius:50%;
	background: #282449 !important;

	a {
		color: var(--text-color) !important;
	}
}

.ant-pagination-item-active{
	opacity:1 !important;
}

`;

export default StyledTable;
