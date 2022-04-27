import axios from 'axios';

const route = 'http://localhost:9000/'

// --------------------------------------------------------------------------------------- Administrador
export function crearUsuario(datos) {
  return axios.post(route + 'Administrador/crearUsuario', datos)
}

export function crearCurso(nombre) {
  return axios.post(route + 'Administrador/crearCurso', { nombre: nombre })
}

export function getUsuarios(tipo) {
  return axios.post(route + 'Administrador/getUsuarios', { tipo: tipo })
}

export function getUsuario(usuario, tipo) {
  return axios.post(route + 'Administrador/getUsuario', { usuario: usuario, tipo: tipo })
}

export function eliminarUsuario(usuario, tipo) {
  return axios.post(route + 'Administrador/eliminarUsuario', { usuario: usuario, tipo: tipo })
}

export function editarUsuario(datos) {
  return axios.post(route + 'Administrador/editarUsuario', datos)
}

export function getCursos() {
  return axios.get(route + 'Administrador/getCursos')
}

export function getCurso(id_curso) {
  return axios.post(route + 'Administrador/getCurso', { id_curso: id_curso })
}

export function getMaestros() {
  return axios.get(route + 'Administrador/getMaestros')
}

export function getAlumnos() {
  return axios.get(route + 'Administrador/getAlumnos')
}

export function asignarCurso(tipo, usuario, curso) {
  return axios.post(route + 'Administrador/asignarCurso', { tipo: tipo, usuario: usuario, curso: curso })
}

export function getClases() {
  return axios.get(route + 'Administrador/getClases')
}





// --------------------------------------------------------------------------------------- MAESTRO
export function getMaestro(id_maestro) {
  return axios.post(route + 'Maestros/getMaestro', { id_maestro: id_maestro })
}

// ---------------------------------------------------------------------- publicaciones

export function getPublicacionesMaestro(id_maestro) {
  return axios.post(route + 'Maestros/getPublicacionesMaestro', { id_maestro: id_maestro })
}

export function getCursosMaestro(id_maestro) {
  return axios.post(route + 'Maestros/getCursosMaestro', { id_maestro: id_maestro })
}

export function getIdClase(id_maestro, id_curso) {
  return axios.post(route + 'Maestros/getIdClase', { id_maestro: id_maestro, id_curso: id_curso })
}

export function crearPublicacion(descripcion, id_clase) {
  return axios.post(route + 'Maestros/createPublicacion', { descripcion: descripcion, id_clase: id_clase })
}

export function getPublicacion(id_publicacion) {
  return axios.post(route + 'Maestros/getPublicacionMaestro', { id_publicacion: id_publicacion })
}

export function updatePublicacion(id_publicacion, descripcion) {
  return axios.post(route + 'Maestros/updatePublicacion', {
    id_publicacion: id_publicacion,
    descripcion: descripcion
  })
}

export function deletePublicacion(id_publicacion) {
  return axios.post(route + 'Maestros/deletePublicacion', { id_publicacion: id_publicacion })
}

// ---------------------------------------------------------------------- actividades
export function getActividadesMaestro(id_maestro) {
  return axios.post(route + 'Maestros/getActividadesMaestro', { id_maestro: id_maestro })
}

export function crearActividad(datos) {
  return axios.post(route + 'Maestros/crearActividad', datos)
}

export function getActividadMaestro(id_actividad) {
  return axios.post(route + 'Maestros/getActividadMaestro', { id_actividad: id_actividad })
}

export function updateActividadMaestro(datos) {
  return axios.post(route + 'Maestros/updateActividadMaestro', datos)
}

export function deleteActividad(id_actividad) {
  return axios.post(route + 'Maestros/deleteActividad', { id_actividad: id_actividad })
}

export function getAlumnosCurso(id_maestro, id_curso) {
  return axios.post(route + 'Maestros/getAlumnosCurso', { id_maestro: id_maestro, id_curso: id_curso })
}


// --------------------------------------------------------------------------------------- Alumno
export function getAlumno(id_alumno) {
  return axios.post(route + 'Alumnos/getAlumno', { id_alumno: id_alumno })
}

export function getPublicacionesAlumno(id_alumno) {
  return axios.post(route + 'Alumnos/getPublicacionesAlumno', { id_alumno: id_alumno })
}

export function getActividadesAlumno(id_alumno) {
  return axios.post(route + 'Alumnos/getActividadesAlumno', { id_alumno: id_alumno })
}

export function getActividadAlumno(id_asignacion_actividad) {
  return axios.post(route + 'Alumnos/getActividadAlumno', { id_asignacion_actividad: id_asignacion_actividad })
}


