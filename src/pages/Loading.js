import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Loading = () => (
	<Wrapper>
		<Spin />
	</Wrapper>
);

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 2em);
    background: var(--bg-color);
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding-top: 1em;
`;

export default Loading;
