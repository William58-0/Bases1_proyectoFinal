import styled from 'styled-components';
import fondo from '../../images/admin.jpg';

const Form = styled.form`
    margin: auto;  
    margin-right: 5%;
    margin-left: 5%; 
    width: auto;
    padding: 2%; 
`;

const Container = styled.div`
width: 100%;
height: 657px;
box-sizing: border-box;
background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${fondo}), no-repeat center top;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
color: white;
overflow-y: hidden;
`;


export { Container, Form };