import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

const imgDefault = 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg';

const getImagen = () => {
  try {
    // primero busca si esta la imagen en formato jpg
    let imagen = require('../../profile_image/imagen.jpg');
    return imagen
  }
  catch (err) {
    // si no encuentra en ningun formato devuelve esta por defecto
    console.log("no estaba en ninguno");
    return imgDefault
  }
}

const verImagen = (src) => {
  if (src !== imgDefault) {
    window.open(src);
  }
}

const NavBar = (props) => {
  return (
    <div>
      <Container>
        <img style={{ borderRadius: '50%', marginLeft: "1%" }}
          src={getImagen()}
          width={27}
          onClick={() => verImagen(getImagen())} />
        <p style={{ color: 'white', margin: '0 10px', fontWeight: 'bold' }}>Maestro: {props.maestro}</p>
        <StyledLink to={"/maestros/publicaciones/" + props.id_maestro}>Publicacion</StyledLink>
        <StyledLink to={"/maestros/actividades/" + props.id_maestro}>Actividades</StyledLink>
        <StyledLink to={"/maestros/examenes/" + props.id_maestro}>Examenes</StyledLink>
        <StyledLink to={"/maestros/adminalumnos/" + props.id_maestro}>Alumnos</StyledLink>
        <Link to="/" style={{ marginRight: '2%', marginLeft: 'auto' }}>
          <FontAwesomeIcon icon={faSignOut} color='white' size='1x' />
        </Link>
      </Container>
    </div>
  );
};

export default NavBar;