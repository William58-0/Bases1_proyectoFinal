USE proyecto_lab;

-- ___________________________ Obetener maestro ___________________________
CREATE PROCEDURE get_maestro (
	IN id_maestro INT
)
BEGIN 
	SELECT * FROM maestro WHERE maestro.id_maestro = id_maestro;
END;

DROP PROCEDURE IF EXISTS get_maestro;
CALL get_maestro(5);

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

DROP PROCEDURE IF EXISTS get_publicaciones_maestro;
CALL get_publicaciones_maestro(449);

-- ___________________________ Obetener publicaciones ___________________________
CREATE PROCEDURE get_curso_maestro (
	IN id_maestro INT
)
BEGIN 
    SELECT * FROM clase
    INNER JOIN curso USING (id_curso) 
    WHERE clase.id_maestro = id_maestro;
END;

DROP PROCEDURE IF EXISTS get_curso_maestro;
CALL get_curso_maestro(449);

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

DROP PROCEDURE IF EXISTS get_id_clase;
CALL get_id_clase(173, 4);

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

DROP PROCEDURE IF EXISTS create_publicacion;
CALL create_publicacion('descripcion', 1);

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

DROP PROCEDURE IF EXISTS get_publicacion_maestro;
CALL get_publicacion_maestro(1);


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

DROP PROCEDURE IF EXISTS update_publicacion;
CALL update_publicacion(1, 'descripcion nueva');

SELECT * FROM publicacion;

-- ___________________________ Borrar publicacion ___________________________
CREATE PROCEDURE delete_publicacion (
	IN id_publucacion INT
)
BEGIN 
	DELETE FROM publicacion WHERE id_publucacion = id_publucacion;
END;

DROP PROCEDURE IF EXISTS delete_publicacion;
CALL delete_publicacion(1);

SELECT * FROM publicacion;


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

DROP PROCEDURE IF EXISTS get_actividades_maestro;
CALL get_actividades_maestro(179);

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

DROP PROCEDURE IF EXISTS insert_actividad;
CALL insert_actividad('titulo', 'descripcion', NOW(), 100, 1);


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

DROP PROCEDURE IF EXISTS insert_asignacion_actividad;
CALL insert_asignacion_actividad("Pendiente", 1, 1);

-- ___________________________ get actividad maestro ___________________________
CREATE PROCEDURE update_actividad_maestro (
	IN id_actividad INT
)
BEGIN 
    SELECT *
    FROM clase
    INNER JOIN actividad USING (id_clase)
    INNER JOIN curso USING (id_curso)
    WHERE actividad.id_actividad = id_actividad;
END;

DROP PROCEDURE IF EXISTS get_actividad_maestro;
CALL get_actividad_maestro(1);


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

DROP PROCEDURE IF EXISTS update_actividad_maestro;
CALL update_actividad_maestro('titulo', 'descripcion', NOW(), 100, 1);


-- ___________________________ borrar actividad maestro ___________________________
CREATE PROCEDURE delete_actividad (
	IN id_actividad INT
)
BEGIN 
	DELETE FROM actividad WHERE actividad.id_actividad = id_actividad;
END;

DROP PROCEDURE IF EXISTS delete_actividad;
CALL delete_actividad(100);


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

DROP PROCEDURE IF EXISTS get_alumnos_curso;
CALL get_alumnos_curso(1705, 3);


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

DROP PROCEDURE IF EXISTS get_entregas;
CALL get_entregas(1);


-- ___________________________ obtener entrega ___________________________
CREATE PROCEDURE get_entrega (
	IN id_observacion INT
)
BEGIN 
    SELECT * FROM clase
    INNER JOIN curso USING (id_curso)
    INNER JOIN actividad USING (id_clase)
    INNER JOIN asignacion_actividad USING (id_actividad)
    INNER JOIN alumno USING (id_alumno)
    WHERE (observacion.id_observacion = id_observacion); 
END;

DROP PROCEDURE IF EXISTS get_entrega;
CALL get_entrega(1);


-- ___________________________ calificar entrega paso 1 ___________________________

CREATE PROCEDURE asignar_punteo_actividad (
	IN puntacion DECIMAL,
	IN id_asignacion_actividad INT,
)
BEGIN 
    UPDATE asignacion_actividad SET
    asignacion_actividad.puntuacion = puntacion
    WHERE asignacion_actividad.id_asignacion_actividad = id_asignacion_actividad;
END;

DROP PROCEDURE IF EXISTS asignar_punteo_actividad;
CALL asignar_punteo_actividad(75, 1);

-- ___________________________ calificar entrega paso 2 ___________________________

CREATE PROCEDURE realizar_observacion_actividad (
	IN texto VARCHAR(250),
	IN id_asignacion_actividad INT,
)
BEGIN 
      INSERT INTO observacion(texto, id_asignacion_actividad)
      VALUES(texto, id_asignacion_actividad);
END;

DROP PROCEDURE IF EXISTS realizar_observacion_actividad;
CALL realizar_observacion_actividad('observacion', 1);



