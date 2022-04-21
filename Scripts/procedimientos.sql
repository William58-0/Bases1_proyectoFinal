-- ___________________________ Carga de publicacion ___________________________
CREATE PROCEDURE create_publicacion (
	IN descripcion VARCHAR(250), 
	IN fecha VARCHAR(250), 
	IN id_clase INT
)
BEGIN
	INSERT INTO publicacion
	(descripcion, fecha, id_clase)
	VALUES (descripcion, STR_TO_DATE(fecha,'%m/%d/%Y'), id_clase);
END;

DROP PROCEDURE IF EXISTS create_publicacion;
CALL create_publicacion('descripcion','12/12/2000', 1);


CREATE PROCEDURE update_publicacion (
	IN id_publucacion INT, 
	IN descripcion VARCHAR(250), 
	IN fecha VARCHAR(250), 
	IN id_clase INT
)
BEGIN 
	UPDATE publicacion 
	SET  
		descripcion = descripcion,
		fecha = STR_TO_DATE(fecha,'%m/%d/%Y'),
		id_clase = id_clase 
	WHERE id_publucacion = id_publucacion;
END;

DROP PROCEDURE IF EXISTS update_publicacion;
CALL update_publicacion(1, 'nueva descripcion', '01/01/2022', 1)


CREATE PROCEDURE delete_publicacion (
	IN id_publucacion INT
)
BEGIN 
	DELETE FROM publicacion WHERE id_publucacion = id_publucacion;
END;

DROP PROCEDURE IF EXISTS delete_publicacion;
CALL delete_publicacion(1);


CREATE PROCEDURE get_publicacion (
	IN id_publucacion INT
)
BEGIN
	DECLARE publicion 
	DELETE FROM publicacion WHERE id_publucacion = id_publucacion;
END;

SELECT * FROM publicacion;
DELETE FROM publicacion;
















