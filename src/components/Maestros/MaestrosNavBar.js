import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
  text-decoration: none;
  margin: 0 20px;
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #333;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const NavBar = (props) => {
  return (
    <div>
      <Container>
        <StyledLink to="/">{props.maestro}</StyledLink>
        <StyledLink to="/maestros/publicacion">Publicacion</StyledLink>
        <StyledLink to="/maestros/actividades">Actividades</StyledLink>
        <StyledLink to="/maestros/notas">Mis Notas</StyledLink>
        <StyledLink to="/maestros/examenes">Examenes</StyledLink>
        <Link style={{ marginRight: '2%', marginLeft: 'auto' }}>
          <FontAwesomeIcon icon={faBell} color='white' size='1x' />
        </Link>
      </Container>
    </div>
  );
};

export default NavBar;