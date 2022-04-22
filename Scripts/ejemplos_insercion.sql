INSERT INTO maestro(
	nombre, 
	apellido, 
	telefono, 
	direccion, 
	correo, 
	fecha_nacimiento, 
	dpi,
	contrasenia 
) VALUES(
	"nombre", 
	"apellido", 
	"123-23", 
	"casa", 
	"email", 
	CURDATE(),
	74893274839,
	"pass"
);


INSERT INTO alumno(
	carnet, 
	nombre, 
	apellido, 
	telefono,
	direccion, 
	correo, 
	contrasenia 
) VALUES(
	201909103, 
	"nombre", 
	"apellido", 
	"123321-23", 
	"casa", 
	"email", 
	"pass"
);

DELETE FROM maestro;
DELETE FROM alumno;

--- reiniciar contador auto_increment de tablas
SET  @num := 0;
UPDATE maestro SET id_maestro = @num := (@num+1);
ALTER TABLE maestro AUTO_INCREMENT = 1;

SET  @num := 0;
UPDATE alumno SET id_alumno = @num := (@num+1);
ALTER TABLE alumno AUTO_INCREMENT = 1;

