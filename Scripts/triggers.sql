USE proyecto_lab;

-- ________________________________ notificar publicacion _________________________________________
CREATE TRIGGER notificar_publicacion
AFTER INSERT ON publicacion
FOR EACH ROW
BEGIN
	INSERT INTO notificacion 
	(titulo, contenido, fecha_hora, id_publicacion)
	VALUES ('Publicacion realizada', 'Tienes una publicacion por ver', SYSDATE(), NEW.id_publicacion);
	
END;


-- ________________________________ notificar actividad _________________________________________
CREATE TRIGGER notificar_actividad
AFTER INSERT ON actividad 
FOR EACH ROW
BEGIN
	INSERT INTO notificacion 
	(titulo, contenido, fecha_hora, id_actividad)
	VALUES ('Actividad publicada', 'Tienes una actividad por ver', SYSDATE(), NEW.id_actividad);
	
END;


-- ________________________________ notificar examen _________________________________________
CREATE TRIGGER notificar_examen
AFTER INSERT ON examen
FOR EACH ROW
BEGIN
	INSERT INTO notificacion 
	(titulo, contenido, fecha_hora, id_examen)
	VALUES ('Examen publicado', 'Tienes una publicacion por ver', SYSDATE(), NEW.id_examen);
	
END;

