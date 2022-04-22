USE proyecto_lab;

-- Publicaciones para un maestro
SELECT *
FROM clase
INNER JOIN publicacion USING(id_clase)
WHERE (clase.id_curso = 4 AND clase.id_maestro = 449);
 

-- Publicaciones para un alumnos
SELECT 
	publicacion.id_publicacion,
	publicacion.descripcion,
	publicacion.fecha,
	publicacion.id_clase
FROM alumno
INNER JOIN asignacion_clase USING(id_alumno)
INNER JOIN clase USING(id_clase)
INNER JOIN publicacion  USING (id_clase)
WHERE alumno.id_alumno = 1;

-- Publicaciones para un alumnos



