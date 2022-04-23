import axios from 'axios';

const route = 'http://localhost:9000/'

// --------------------------------------------------------------------------------------- Administrador
export function crearUsuario(datos) {
  return axios.post(route + 'Usuarios/crearUsuario', datos)
}

export function crearCurso(nombre) {
  return axios.post(route + 'Curso/crearCurso', { nombre: nombre })
}

export function getUsuarios(tipo) {
  return axios.post(route + 'Usuarios/getUsuarios', { tipo: tipo })
}

export function getUsuario(usuario, tipo) {
  return axios.post(route + 'Usuarios/getUsuario', { usuario: usuario, tipo: tipo })
}

export function eliminarUsuario(usuario, tipo) {
  return axios.post(route + 'Usuarios/eliminarUsuario', { usuario: usuario, tipo: tipo })
}

export function editarUsuario(datos) {
  return axios.post(route + 'Usuarios/editarUsuario', datos)
}

export function getCursos() {
  return axios.get(route + 'Curso/getCursos')
}

export function getCurso(id_curso) {
  return axios.post(route + 'Curso/getCurso', { id_curso: id_curso })
}

export function getMaestros() {
  return axios.get(route + 'Maestros/getMaestros')
}

export function getAlumnos() {
  return axios.get(route + 'Alumnos/getAlumnos')
}



// --------------------------------------------------------------------------------------- Maestro
export function crearPublicacion(datos) {
  return axios.post(route + 'Publicaciones/createPublicacion', datos)
}

export function getPublicacionesMaestro(datos) {
  return axios.post(route + 'Publicaciones/getPublicacionesMaestro', datos)
}

export function getCursosMaestro(datos) {
  return axios.post(route + 'Curso/getCursosMaestro', datos)
}


// --------------------------------------------------------------------------------------- Alumno
export function getPublicaciones(datos) {
  return axios.post(route + 'Usuarios/crearUsuario', datos)
}

