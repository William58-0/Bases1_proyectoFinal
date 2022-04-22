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
        <img style={{ borderRadius: '50%', marginLeft: "1%" }}
          src='https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg'
          width={27}
        />
        <p style={{ color: 'white', margin: '0 10px', fontWeight: 'bold' }}>Maestro: {props.maestro}</p>
        <StyledLink to={"/maestros/publicaciones/" + props.maestro}>Publicacion</StyledLink>
        <StyledLink to={"/maestros/actividades/" + props.maestro}>Actividades</StyledLink>
        <StyledLink to={"/maestros/examenes/" + props.maestro}>Examenes</StyledLink>
        <Link to="/" style={{ marginRight: '2%', marginLeft: 'auto' }}>
          <FontAwesomeIcon icon={faSignOut} color='white' size='1x' />
        </Link>
      </Container>
    </div>
  );
};

export default NavBar;