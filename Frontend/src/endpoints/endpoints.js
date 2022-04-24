import axios from 'axios';

const route = 'http://localhost:9000/'

// --------------------------------------------------------------------------------------- Administrador
export function crearUsuario(datos) {
  return axios.post(route + 'Usuarios/crearUsuario', datos)
}

export function crearCurso(nombre) {
  return axios.post(route + 'Usuarios/crearCurso', { nombre: nombre })
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
  return axios.get(route + 'Usuarios/getCursos')
}

export function getCurso(id_curso) {
  return axios.post(route + 'Usuarios/getCurso', { id_curso: id_curso })
}

export function getMaestros() {
  return axios.get(route + 'Usuarios/getMaestros')
}

export function getAlumnos() {
  return axios.get(route + 'Usuarios/getAlumnos')
}



// --------------------------------------------------------------------------------------- Maestro
export function getMaestro(id_maestro) {
  return axios.post(route + 'Maestros/getMaestro', { id_maestro: id_maestro })
}

export function getPublicacionesMaestro(datos) {
  return axios.post(route + 'Maestros/getPublicacionesMaestro', datos)
}

export function getCursosMaestro(datos) {
  return axios.post(route + 'Maestros/getCursosMaestro', datos)
}

export function getIdClase(id_maestro, id_curso) {
  return axios.post(route + 'Maestros/getIdClase', { id_maestro: id_maestro, id_curso: id_curso })
}

export function crearPublicacion(descripcion, id_clase) {
  return axios.post(route + 'Maestros/createPublicacion', { descripcion: descripcion, id_clase: id_clase })
}

export function getPublicacion(id_publicacion) {
  return axios.post(route + 'Maestros/getPublicacion', { id_publicacion: id_publicacion })
}

export function updatePublicacion(id_publicacion, descripcion) {
  return axios.post(route + 'Maestros/updatePublicacion', {
    id_publicacion: id_publicacion,
    descripcion: descripcion
  })
}

export function deletePublicacion(id_publicacion) {
  return axios.post(route + 'Maestros/deletePublicacion', {id_publicacion: id_publicacion})
}


// --------------------------------------------------------------------------------------- Alumno
export function getPublicaciones(datos) {
  return axios.post(route + 'Usuarios/crearUsuario', datos)
}

