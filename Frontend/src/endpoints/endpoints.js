import axios from 'axios';

const route = 'http://localhost:9000/'

// --------------------------------------------------------------------------------------- Administrador
export function crearUsuario(datos) {
  return axios.post(route + 'Usuarios/crearUsuario', datos)
}

export function getUsuarios(tipo) {
  console.log(tipo);
  return axios.post(route + 'Usuarios/getUsuarios', { tipo: tipo })
}

