USE proyecto_lab;


SELECT * FROM actividad;
SELECT * FROM alumno;
SELECT * FROM asignacion_actividad;
SELECT * FROM asignacion_clase;
SELECT * FROM asignacion_examen;
SELECT * FROM clase;
SELECT * FROM curso;
SELECT * FROM examen;
SELECT * FROM maestro;
SELECT * FROM notificacion;
SELECT * FROM observacion;
SELECT * FROM opcion;
SELECT * FROM pregunta;
SELECT * FROM publicacion;
SELECT * FROM respuesta_alumno;

DELETE FROM actividad;
DELETE FROM alumno;
DELETE FROM asignacion_actividad;
DELETE FROM asignacion_clase;
DELETE FROM asignacion_examen;
DELETE FROM clase;
DELETE FROM curso;
DELETE FROM examen;
DELETE FROM maestro;
DELETE FROM notificacion;
DELETE FROM observacion;
DELETE FROM opcion;
DELETE FROM pregunta;
DELETE FROM publicacion;

SET  @num := 0;
UPDATE alumno SET id_alumno = @num := (@num+1);
ALTER TABLE alumno AUTO_INCREMENT =1;

SET  @num := 0;
UPDATE maestro SET id_maestro = @num := (@num+1);
ALTER TABLE maestro AUTO_INCREMENT =1;