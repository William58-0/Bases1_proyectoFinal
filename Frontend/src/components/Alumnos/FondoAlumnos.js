import styled from 'styled-components';
import fondo from '../../images/alumno.jpg';

const Container = styled.div`
width: 100%;
height: 657px;
box-sizing: border-box;
background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${fondo}), no-repeat center top;
background-size: cover;
justify-content: center;
align-items: center;
color: white;
background-repeat: no-repeat;
background-attachment: fixed;
overflow: auto;
`;



export default Container;
