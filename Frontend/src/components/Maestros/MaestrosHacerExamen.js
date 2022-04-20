import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';


import NavBar from './MaestrosNavBar';
import Container from './FondoMaestros';
import './maestro.css';

function MaestrosEntregarActividad() {
  return (
    <Container>
      <NavBar maestro={maestro} />
    </Container>
  
  );
}

export default MaestrosEntregarActividad;