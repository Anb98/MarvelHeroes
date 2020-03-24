import React, {
	useEffect,
	useContext,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CharactersContext } from '@contexts/CharactersContext';
import StyledTable from '@components/StyledTable';

const Characters = () => {
	const { favorites, state, actions: { search } } = useContext(CharactersContext);

	const columns = [
		{
			title: 'Name',
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
			render: (text) => {
				if (!text) return 'No description 😢';

				if (text.length > 130) return `${text.substring(0, 130)}...`;

				return text;
			},
		},
	];

	const onChange = (page) => {
		search({ page });
	};


	useEffect(() => {
		onChange(1);
	}, []);


	return (
		<div>
			<StyledTable
				loading={state.isLoading}
				title='characters'
				dataSource={state.result.rows}
				columns={columns}
				pagination={{
					onChange,
					total: state.result.total,
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

export default Characters;
