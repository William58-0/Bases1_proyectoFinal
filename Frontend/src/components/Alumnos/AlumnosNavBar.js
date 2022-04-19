import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
  text-decoration: none;
  margin: 0 20px;

  &:focus, &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgb(45, 88, 138);
  display: flex;
  justify-content: left;
  align-items: center;
`;

const NavBar = (props) => {
  return (
    <div>
      <Container>
        <p style={{color:'white', margin: '0 20px', fontWeight: 'bold'}}>Alumno: {props.estudiante}</p>
        <StyledLink to={"/alumnos/publicacion/" + props.estudiante}>Publicacion</StyledLink>
        <StyledLink to={"/alumnos/actividades/" + props.estudiante}>Actividades</StyledLink>
        <StyledLink to={"/alumnos/notas/" + props.estudiante}>Mis Notas</StyledLink>
        <StyledLink to={"/alumnos/examenes/" + props.estudiante}>Examenes</StyledLink>
        <Link style={{ marginRight: '2%', marginLeft: 'auto' }}>
          <FontAwesomeIcon icon={faBell} color='white' size='1x' />
        </Link>
        <Link to="/" style={{ marginRight: '2%' }}>
          <FontAwesomeIcon icon={faSignOut} color='white' size='1x' />
        </Link>
      </Container>
    </div>
  );
};

export default NavBar;