USE proyecto_lab;

-- ___________________________ Carga de curso ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\curso.csv' 
INTO TABLE curso  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_curso, nombre_curso);

SELECT COUNT(*) AS num_filas FROM curso;
SELECT * FROM curso LIMIT 10;


-- ___________________________ Carga de maestro ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\maestros.csv' 
INTO TABLE maestro  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_maestro, nombre, apellido, telefono, direccion, correo, @fecha_nacimiento, dpi, contrasenia)
SET fecha_nacimiento = STR_TO_DATE(@fecha_nacimiento, '%m/%d/%Y');

SELECT COUNT(*) AS num_filas FROM maestro;
SELECT * FROM maestro LIMIT 10;

-- ___________________________ Carga de alumno ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\alumnos.csv' 
INTO TABLE alumno  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM alumno;
SELECT * FROM alumno LIMIT 10;


-- ___________________________ Carga de clase ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\clase.csv' 
INTO TABLE clase  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_clase, id_curso, id_maestro);

SELECT COUNT(*) AS num_filas FROM clase;
SELECT * FROM clase LIMIT 10;


-- ___________________________ Carga de asignacion_clase ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\asignacion_clase.csv' 
INTO TABLE asignacion_clase  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_asignacion_clase, id_clase, id_alumno);

SELECT COUNT(*) AS num_filas FROM asignacion_clase;
SELECT * FROM asignacion_clase LIMIT 10;



-- ___________________________ Carga de publicacion ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\publicacion.csv' 
INTO TABLE publicacion  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_publicacion, descripcion, @fecha, id_clase)
SET fecha = STR_TO_DATE(@fecha, '%Y-%m-%d %H:%i:%S');

SELECT COUNT(*) AS num_filas FROM publicacion;
SELECT * FROM publicacion LIMIT 10;


-- ___________________________ Carga de actividad ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\actividad.csv' 
INTO TABLE actividad  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_actividad, titulo, descripcion, @fecha_publicacion, @fecha_entrega, valor, id_clase)
SET fecha_publicacion = STR_TO_DATE(@fecha_publicacion, '%Y-%m-%d %H:%i:%S'),
	fecha_entrega = STR_TO_DATE(@fecha_entrega, '%Y-%m-%d %H:%i:%S')
;

SELECT COUNT(*) AS num_filas FROM actividad;
SELECT * FROM actividad LIMIT 10;

-- ___________________________ Carga de examen ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\examen.csv' 
INTO TABLE examen  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_examen, fecha_publicacion, fecha_inicio, fecha_final, id_clase)

SELECT COUNT(*) AS num_filas FROM examen;
SELECT * FROM examen LIMIT 10;

-- ___________________________ Carga de notificacion ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\notificacion.csv' 
INTO TABLE notificacion  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM notificacion;
SELECT * FROM notificacion LIMIT 10;


-- ___________________________ Carga de pregunta ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\pregunta.csv' 
INTO TABLE pregunta  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM pregunta;
SELECT * FROM pregunta LIMIT 10;


-- ___________________________ Carga de asignacion_actividad ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\asignacion_actividad.csv' 
INTO TABLE asignacion_actividad  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM asignacion_actividad;
SELECT * FROM asignacion_actividad LIMIT 10;


-- ___________________________ Carga de observacion ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\observacion.csv' 
INTO TABLE observacion  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM observacion;
SELECT * FROM observacion LIMIT 10;


-- ___________________________ Carga de asignacion_examen ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\asignacion_examen.csv' 
INTO TABLE asignacion_examen  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM asignacion_examen;
SELECT * FROM asignacion_examen LIMIT 10;


-- ___________________________ Carga de opcion ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\opcion.csv' 
INTO TABLE opcion  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM opcion;
SELECT * FROM opcion LIMIT 10;


-- ___________________________ Carga de respuesta_alumno ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\respuesta_alumno.csv' 
INTO TABLE respuesta_alumno  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM respuesta_alumno;
SELECT * FROM respuesta_alumno LIMIT 10;



