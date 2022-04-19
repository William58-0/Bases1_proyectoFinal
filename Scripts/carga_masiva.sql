-- ___________________________ Carga de curso ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\curso.csv' 
INTO TABLE curso  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM curso;


-- ___________________________ Carga de maestro ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\maestro.csv' 
INTO TABLE maestro  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM maestro;


-- ___________________________ Carga de alumno ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\alumno.csv' 
INTO TABLE alumno  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM alumno;


-- ___________________________ Carga de clase ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\clase.csv' 
INTO TABLE clase  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM clase;


-- ___________________________ Carga de asignacion_clase ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\asignacion_clase.csv' 
INTO TABLE asignacion_clase  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM asignacion_clase;


-- ___________________________ Carga de publicacion ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\publicacion.csv' 
INTO TABLE publicacion  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM publicacion;


-- ___________________________ Carga de actividad ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\actividad.csv' 
INTO TABLE actividad  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM actividad;


-- ___________________________ Carga de examen ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\examen.csv' 
INTO TABLE examen  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM examen;


-- ___________________________ Carga de notificacion ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\notificacion.csv' 
INTO TABLE notificacion  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM notificacion;


-- ___________________________ Carga de pregunta ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\pregunta.csv' 
INTO TABLE pregunta  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM pregunta;


-- ___________________________ Carga de asignacion_clase ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\asignacion_clase.csv' 
INTO TABLE asignacion_clase  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM asignacion_clase;


-- ___________________________ Carga de asignacion_actividad ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\asignacion_actividad.csv' 
INTO TABLE asignacion_actividad  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM asignacion_actividad;


-- ___________________________ Carga de observacion ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\observacion.csv' 
INTO TABLE observacion  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM observacion;


-- ___________________________ Carga de asignacion_examen ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\asignacion_examen.csv' 
INTO TABLE asignacion_examen  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM asignacion_examen;


-- ___________________________ Carga de opcion ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\opcion.csv' 
INTO TABLE opcion  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM opcion;


-- ___________________________ Carga de respuesta_alumno ___________________________
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\respuesta_alumno.csv' 
INTO TABLE respuesta_alumno  
CHARACTER SET latin1
FIELDS TERMINATED BY ','  
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT COUNT(*) AS num_filas FROM respuesta_alumno;



