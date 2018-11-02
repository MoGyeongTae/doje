import React from 'react';
import styled from 'styled-components';

const FooterComponent = styled.div`
    width:100%;
    height:50px;
    border:1px solid black;
    text-align:center;
    margin-top:5px;
    & > span {
        line-height:50px;
    }
`

const Footer = () => {
    return (
        <FooterComponent>
            <span>CopyRight &copy; 정보처리산업기사 All Right Reserved</span>
        </FooterComponent>
    );
}

export default Footer;