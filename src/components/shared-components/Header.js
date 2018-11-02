import React from 'react';
import styled from 'styled-components';

const HeaderComponent = styled.div`
    width:100%;
    height:50px;
    text-align:center;
    border:1px solid black;
    margin-bottom:5px;
    & > span {
        line-height:50px;
    }
`

const Header = () => {
    return (
        <HeaderComponent>
            <span>커뮤니티 사이트</span>
        </HeaderComponent>
    )
}

export default Header;