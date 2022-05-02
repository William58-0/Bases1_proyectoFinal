#USE proyecto_lab;

-- ___________________________ Obtener alumno ___________________________
CREATE PROCEDURE get_alumno (
	IN id_alumno INT
)
BEGIN 
	SELECT * FROM alumno WHERE alumno.id_alumno = id_alumno;
END;


-- ___________________________ Obtener publicaciones alumno ___________________________
CREATE PROCEDURE get_publicaciones_alumno (
	IN id_alumno INT
)
BEGIN 
    SELECT *
    FROM clase
    INNER JOIN publicacion USING (id_clase)
    INNER JOIN curso USING (id_curso)
    INNER JOIN asignacion_clase USING (id_clase)
    WHERE asignacion_clase.id_alumno = id_alumno;
END;


-- ___________________________ Obtener actividades alumno ___________________________
CREATE PROCEDURE get_actividades_alumno (
	IN id_alumno INT
)
BEGIN 
	SELECT * FROM asignacion_actividad
 	INNER JOIN actividad USING (id_actividad)
 	INNER JOIN clase USING (id_clase)
 	INNER JOIN curso USING (id_curso)
 	WHERE asignacion_actividad.id_alumno = id_alumno;
END;


-- ___________________________ Obtener actividad alumno ___________________________
CREATE PROCEDURE get_actividad_alumno (
	IN id_asignacion_actividad INT
)
BEGIN 
  SELECT * FROM asignacion_actividad
  INNER JOIN actividad USING (id_actividad)
  WHERE asignacion_actividad.id_asignacion_actividad = id_asignacion_actividad;
END;


-- ___________________________ Entregar actividad alumno ___________________________
CREATE PROCEDURE entregar_actividad (
	IN archivo VARCHAR(250),
	IN id_asignacion_actividad INT
)
BEGIN 
    UPDATE asignacion_actividad 
    SET asignacion_actividad.fecha_hora = SYSDATE(), 
    asignacion_actividad.archivo = archivo,
    asignacion_actividad.estado_actividad = "Entregado" 
    WHERE asignacion_actividad.id_asignacion_actividad = id_asignacion_actividad;
END;


-- ___________________________ Obtener clases alumno ___________________________
CREATE PROCEDURE get_clases_alumno (
	IN id_alumno INT
)
BEGIN 
	SELECT * FROM clase
 	INNER JOIN curso USING (id_curso)
 	INNER JOIN asignacion_clase USING (id_clase)
 	WHERE asignacion_clase.id_alumno = id_alumno;
END;

-- ___________________________ Obtener Notas alumno ___________________________
CREATE PROCEDURE get_notas_alumno (
	IN id_alumno INT,
	IN id_clase INT
)
BEGIN 
	SELECT * FROM clase
	INNER JOIN actividad USING (id_clase)
	INNER JOIN asignacion_actividad USING (id_actividad)
	WHERE (asignacion_actividad.id_alumno = id_alumno) AND (actividad.id_clase = id_clase);
END;


-- ___________________________ Obtener total alumno ___________________________
CREATE PROCEDURE get_total_alumno (
	IN id_alumno INT,
	IN id_clase INT
)
BEGIN 
	SELECT SUM(puntuacion) as total FROM asignacion_actividad
	INNER JOIN actividad USING (id_actividad)
	INNER JOIN alumno USING (id_alumno)
	WHERE (asignacion_actividad.id_alumno = id_alumno) AND (actividad.id_clase = id_clase)
	GROUP BY id_alumno ;
END;