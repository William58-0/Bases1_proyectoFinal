USE proyecto_lab;

-- __________________________________ Publicaciones ___________________________________________________

-- Obtener publicaicones de maestro por curso
SELECT *
FROM clase
INNER JOIN publicacion USING (id_clase)
INNER JOIN curso USING (id_curso)
WHERE (clase.id_curso = 4 AND clase.id_maestro = 449);

-- Publicaciones hechas para un alumnos
SELECT 
	publicacion.id_publicacion,
	publicacion.descripcion,
	publicacion.fecha,
	publicacion.id_clase
FROM alumno
INNER JOIN asignacion_clase USING (id_alumno)
INNER JOIN clase USING (id_clase)
INNER JOIN publicacion  USING (id_clase)
WHERE alumno.id_alumno = 1;

-- Obtener los cursos que imparte un maestro 
SELECT 
curso.id_curso,
curso.nombre_curso 
FROM maestro
INNER JOIN clase USING(id_maestro)
INNER JOIN curso USING(id_curso)
WHERE maestro.id_maestro = 1705;

-- __________________________________ Actividades ___________________________________________________

-- Obtener las actividad hechas por un maestro por curso
SELECT 
actividad.id_actividad,
actividad.titulo,
actividad.descripcion,
actividad.fecha_publicacion,
actividad.fecha_entrega,
actividad.valor,
clase.id_clase 
FROM maestro
INNER JOIN clase USING (id_maestro)
INNER JOIN actividad USING (id_clase)
WHERE (maestro.id_maestro = 179 AND clase.id_clase = 45);


-- Obtener actividades en las que ha sido asignado un alumno 
SELECT 
*
FROM alumno
INNER JOIN asignacion_actividad USING ()







