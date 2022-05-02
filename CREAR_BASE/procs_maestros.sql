#USE proyecto_lab;

-- ___________________________ Obetener maestro ___________________________
CREATE PROCEDURE get_maestro (
	IN id_maestro INT
)
BEGIN
	SELECT * FROM maestro WHERE maestro.id_maestro = id_maestro;
END;


-- ___________________________ Obetener publicaciones ___________________________
CREATE PROCEDURE get_publicaciones_maestro (
	IN id_maestro INT
)
BEGIN 
	SELECT *
	FROM clase
	INNER JOIN publicacion USING (id_clase)
	INNER JOIN curso USING (id_curso)
	WHERE clase.id_maestro = id_maestro;	
END;


-- ___________________________ Obetener publicaciones ___________________________
CREATE PROCEDURE get_curso_maestro (
	IN id_maestro INT
)
BEGIN 
    SELECT * FROM clase
    INNER JOIN curso USING (id_curso) 
    WHERE clase.id_maestro = id_maestro;
END;


-- ___________________________ Obetener id de clase ___________________________
CREATE PROCEDURE get_id_clase (
	IN id_maestro INT,
	IN id_curso INT
)
BEGIN 
    SELECT id_clase 
    FROM clase
    INNER JOIN curso USING (id_curso) 
    WHERE clase.id_maestro = id_maestro AND clase.id_curso = id_curso;
END;


-- ___________________________ Crear publicacion ___________________________
CREATE PROCEDURE create_publicacion (
	IN descripcion VARCHAR(250), 
	IN id_clase INT
)
BEGIN
	INSERT INTO publicacion
	(descripcion, fecha, id_clase)
	VALUES (descripcion, now(), id_clase);
END;


-- ___________________________ Obetener publicacion de maestro ___________________________
CREATE PROCEDURE get_publicacion_maestro  (
	IN id_publicacion INT
)
BEGIN
    SELECT *
    FROM clase
    INNER JOIN publicacion USING (id_clase)
    INNER JOIN curso USING (id_curso)
    WHERE publicacion.id_publicacion = id_publicacion;
END;


-- ___________________________ Actualizar publicacion ___________________________
CREATE PROCEDURE update_publicacion (
	IN id_publicacion INT, 
	IN descripcion VARCHAR(250)
)
BEGIN 
    UPDATE publicacion 
    SET 
    publicacion.descripcion = descripcion,
    publicacion.fecha = CURDATE()
    WHERE publicacion.id_publicacion = id_publicacion;
END;


-- ___________________________ Borrar publicacion ___________________________
CREATE PROCEDURE delete_publicacion (
	IN id_publicacion INT
)
BEGIN 
	DELETE FROM publicacion WHERE publicacion.id_publicacion = id_publicacion;
END;


-- ___________________________ Obtener actividad de maestro ___________________________
CREATE PROCEDURE get_actividades_maestro (
	IN id_maestro INT
)
BEGIN 
  SELECT * FROM clase
  INNER JOIN actividad USING (id_clase)
  INNER JOIN curso USING (id_curso)
  WHERE clase.id_maestro = id_maestro;
END;

-- ___________________________ insertar actividad ___________________________
CREATE PROCEDURE insert_actividad (
	IN titulo VARCHAR(250),
	IN descripcion VARCHAR(250),
	IN fecha_entrega DATETIME, 
	IN valor INT, 
	IN id_clase INT
)
BEGIN 
  INSERT INTO actividad(titulo, descripcion, fecha_publicacion, fecha_entrega, valor, id_clase)
  VALUES(titulo, descripcion, CURDATE(), fecha_entrega, valor, id_clase);
END;


-- ___________________________ insertar actividad ___________________________
CREATE PROCEDURE insert_asignacion_actividad (
	IN estado_actividad VARCHAR(250),
	IN id_actividad INT, 
	IN id_alumno INT
)
BEGIN 
	INSERT INTO asignacion_actividad (estado_actividad, id_actividad, id_alumno)
	VALUES(estado_actividad, id_actividad, id_alumno);
END;

-- ___________________________ get actividad maestro ___________________________
CREATE PROCEDURE get_actividad_maestro (
	IN id_actividad INT
)
BEGIN 
    SELECT *
    FROM clase
    INNER JOIN actividad USING (id_clase)
    INNER JOIN curso USING (id_curso)
    WHERE actividad.id_actividad = id_actividad;
END;


-- ___________________________ update actividad maestro ___________________________
CREATE PROCEDURE update_actividad_maestro (
	IN titulo VARCHAR(250),
	IN descripcion VARCHAR(250),
	IN fecha_entrega DATETIME, 
	IN valor INT, 
	IN id_actividad INT
)
BEGIN 
	UPDATE actividad 
	SET actividad.titulo = titulo, actividad.descripcion = descripcion ,
 	actividad.fecha_publicacion = CURDATE(), actividad.fecha_entrega = fecha_entrega,
 	actividad.valor = valor
 	WHERE actividad.id_actividad = id_actividad;
END;


-- ___________________________ borrar actividad maestro ___________________________
CREATE PROCEDURE delete_actividad (
	IN id_actividad INT
)
BEGIN 
	DELETE FROM actividad WHERE actividad.id_actividad = id_actividad;
END;


-- ___________________________ obtener curso de alumno ___________________________
CREATE PROCEDURE get_alumnos_curso (
	IN id_maestro INT,
	IN id_curso INT
)
BEGIN 
	SELECT * FROM alumno
    INNER JOIN asignacion_clase USING (id_alumno)
    INNER JOIN clase USING (id_clase)
    WHERE (clase.id_maestro = id_maestro)
    AND (clase.id_curso= id_curso);
END;


-- ___________________________ obtener entregas ___________________________
CREATE PROCEDURE get_entregas(
	IN id_maestro INT
)
BEGIN 
    SELECT * FROM clase
    INNER JOIN curso USING (id_curso)
    INNER JOIN actividad USING (id_clase)
    INNER JOIN asignacion_actividad USING (id_actividad)
    INNER JOIN alumno USING (id_alumno)
    WHERE (clase.id_maestro = id_maestro)
    AND (asignacion_actividad.estado_actividad = "Entregado"); 
END;


-- ___________________________ obtener entrega ___________________________
CREATE PROCEDURE get_entrega (
	IN id_asignacion_actividad  INT
)
BEGIN 
    SELECT * FROM clase
    INNER JOIN curso USING (id_curso)
    INNER JOIN actividad USING (id_clase)
    INNER JOIN asignacion_actividad USING (id_actividad)
    INNER JOIN alumno USING (id_alumno)
    WHERE (asignacion_actividad.id_asignacion_actividad = id_asignacion_actividad); 
END;


-- ___________________________ calificar entrega paso 1 ___________________________

CREATE PROCEDURE asignar_punteo_actividad (
	IN puntacion DECIMAL,
	IN id_asignacion_actividad INT
)
BEGIN 
    UPDATE asignacion_actividad SET
    asignacion_actividad.puntuacion = puntacion
    WHERE asignacion_actividad.id_asignacion_actividad = id_asignacion_actividad;
END;

-- ___________________________ calificar entrega paso 2 ___________________________

CREATE PROCEDURE realizar_observacion_actividad (
	IN texto VARCHAR(250),
	IN id_asignacion_actividad INT
)
BEGIN 
      INSERT INTO observacion(texto, id_asignacion_actividad)
      VALUES(texto, id_asignacion_actividad);
END;
