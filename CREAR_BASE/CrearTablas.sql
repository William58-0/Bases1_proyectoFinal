#DROP DATABASE proyecto_lab;
#CREATE DATABASE proyecto_lab;
#USE proyecto_lab;


CREATE TABLE IF NOT EXISTS curso (
	id_curso INT NOT NULL AUTO_INCREMENT,
	nombre_curso  VARCHAR(250),
	PRIMARY KEY (id_curso)
);


CREATE TABLE IF NOT EXISTS maestro (
	id_maestro INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(250),
	apellido VARCHAR(250),
	telefono VARCHAR(250),
	direccion VARCHAR(250),
	correo  VARCHAR(250),
	fecha_nacimiento DATETIME,
	dpi BIGINT,
	contrasenia VARCHAR(250),
	PRIMARY KEY (id_maestro)
);


CREATE TABLE IF NOT EXISTS alumno (
	id_alumno INT NOT NULL AUTO_INCREMENT,
    carnet INT,
    nombre VARCHAR(250),
    apellido VARCHAR(250),
    telefono VARCHAR(250),
    direccion VARCHAR(250),
    correo VARCHAR(250),
    contrasenia VARCHAR(250),
    PRIMARY KEY (id_alumno)
);


CREATE TABLE IF NOT EXISTS clase (
	id_clase INT NOT NULL AUTO_INCREMENT,
	id_curso INT,
	id_maestro INT,
	PRIMARY KEY (id_clase),
	FOREIGN KEY (id_curso) REFERENCES curso (id_curso) ON DELETE CASCADE,
	FOREIGN KEY (id_maestro) REFERENCES maestro (id_maestro) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS asignacion_clase (
	id_asignacion_clase INT NOT NULL AUTO_INCREMENT,
	id_clase INT,
	id_alumno INT,
	PRIMARY KEY (id_asignacion_clase),
	FOREIGN KEY (id_clase) REFERENCES clase (id_clase) ON DELETE CASCADE,
	FOREIGN KEY (id_alumno) REFERENCES alumno (id_alumno) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS publicacion (
	id_publicacion INT NOT NULL AUTO_INCREMENT,
	descripcion VARCHAR(250),
	fecha DATETIME,
	id_clase INT,
	PRIMARY KEY (id_publicacion),
	FOREIGN KEY (id_clase) REFERENCES clase (id_clase) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS actividad (
	id_actividad INT  NOT NULL AUTO_INCREMENT,
	titulo VARCHAR(250),
	descripcion VARCHAR(250),
	fecha_publicacion DATETIME,
	fecha_entrega DATETIME,
	valor INT,
	id_clase INT,
	PRIMARY KEY (id_actividad),
	FOREIGN KEY (id_clase) REFERENCES clase (id_clase) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS examen (
	id_examen INT NOT NULL AUTO_INCREMENT,
	fecha_publicacion DATETIME,
	fecha_inicio DATETIME,
	fecha_final DATETIME,
	id_clase INT,
	PRIMARY KEY (id_examen),
	FOREIGN KEY (id_clase) REFERENCES clase (id_clase) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS notificacion (
	id_notificacion INT NOT NULL AUTO_INCREMENT,
	titulo VARCHAR(250),
	contenido VARCHAR(250),
	fecha_hora DATETIME,
	id_actividad INT,
	id_publicacion INT,
	id_examen INT,
	PRIMARY KEY (id_notificacion),
	FOREIGN KEY (id_actividad) REFERENCES actividad (id_actividad) ON DELETE CASCADE,
	FOREIGN KEY (id_publicacion) REFERENCES publicacion (id_publicacion) ON DELETE CASCADE,
	FOREIGN KEY (id_examen) REFERENCES examen (id_examen) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS pregunta (
	id_pregunta INT NOT NULL AUTO_INCREMENT,
	texto VARCHAR(250),
	valor DECIMAL,
	id_examen INT,
	PRIMARY KEY (id_pregunta),
	FOREIGN KEY (id_examen) REFERENCES examen (id_examen) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS asignacion_actividad (
	id_asignacion_actividad INT NOT NULL AUTO_INCREMENT,
	fecha_hora DATETIME,
	archivo VARCHAR(250),
	estado_actividad VARCHAR (250),
	puntuacion DECIMAL,
	id_actividad INT,
	id_alumno INT,
	PRIMARY KEY (id_asignacion_actividad),
	FOREIGN KEY (id_actividad) REFERENCES actividad (id_actividad) ON DELETE CASCADE,
	FOREIGN KEY (id_alumno) REFERENCES alumno (id_alumno) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS observacion (
	id_observacion INT NOT NULL AUTO_INCREMENT,
	texto VARCHAR(250),
	id_asignacion_actividad INT,
	PRIMARY KEY (id_observacion),
	FOREIGN KEY (id_asignacion_actividad) REFERENCES asignacion_actividad (id_asignacion_actividad) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS asignacion_examen (
	id_asignacion_examen INT NOT NULL AUTO_INCREMENT,
	puntuacion DECIMAL,
	id_examen INT,
	id_alumno INT,
	PRIMARY KEY (id_asignacion_examen),
	FOREIGN KEY (id_examen) REFERENCES examen (id_examen) ON DELETE CASCADE,
	FOREIGN KEY (id_alumno) REFERENCES alumno (id_alumno) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS opcion (
	id_opcion INT NOT NULL AUTO_INCREMENT,
	texto VARCHAR(250),
	validez INT,
	id_pregunta INT,
	PRIMARY KEY (id_opcion),
	FOREIGN KEY (id_pregunta) REFERENCES pregunta (id_pregunta) ON DELETE CASCADE
);


#SHOW TABLES;
