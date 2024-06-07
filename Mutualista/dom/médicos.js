/* Gestión del objeto Médico
	array       : médicos[]
	almacenamos : localStorage
	métodos     : ABM          */

var médicos = [];

/* Inicializamos un almacenamiento local */
function médicos_inicializar() {
	if (localStorage.getItem("médicos") === null)
		localStorage.setItem("médicos", "");
	else {
		var datos = localStorage.getItem("médicos");
		if (datos != "")
			médicos = JSON.parse(datos);
	}
}

/* Métodos auxiliares */
function médicos_buscarPos(id) {
	for (var pos = 0; pos < médicos.length; pos++)
		if (id == médicos[pos].Id)
			return pos;
	return -1;
}

function médicos_limpiarCampos() {
	$("#médico_id").val("");
	$("#médico_nombre").val("");
	$("#médico_especialidad").val([]);
	$("#médicos_lista").val([]);
	$("#médico_id").focus();
}

/*ABM de Médicos*/
function médicos_alta() {
	var id  = $("#médico_id").val();
	var pos = médicos_buscarPos(id);
	if (pos < 0) {
		var id               = $("#médico_id").val();
		var nombre           = $("#médico_nombre").val();
		var especialidad_pos = $("#médico_especialidad").prop("selectedIndex");
		var especialidad_id  = especialidades[especialidad_pos].Id;
		var médico           = {
			Id			  : id,
			Nombre		  : nombre,
			IdEspecialidad: especialidad_id
		};
		médicos[médicos.length] = médico;
		médicos_listar();
		
		/* actualizamos el almacenamiento local */
		localStorage.setItem("médicos", JSON.stringify(médicos));
	}
	else
		alert("Ya existe un médico con el id " + id + ".");
}

function médicos_baja() {
	var id  = $("#médico_id").val();
	var pos = médicos_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra un médico con el id " + id + ".");
	else {
		médicos.splice(pos, 1);
		médicos_limpiarCampos();
		médicos_listar();
		/* actualizamos el almacenamiento local */
		localStorage.setItem("médicos", JSON.stringify(médicos));
	}
}

function médicos_modificar() {
	var id = $("#médico_id").val();
	var pos = médicos_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra un médico con el id " + id + ".");
	else {
		var id               = $("#médico_id").val();
		var nombre           = $("#médico_nombre").val();
		var especialidad_pos = $("#médico_especialidad").prop("selectedIndex");
		var especialidad_id  = especialidades[especialidad_pos].Id;
		var médico           = {
			Id			  : id,
			Nombre		  : nombre,
			IdEspecialidad: especialidad_id
		};
		médicos[pos] = médico;
		médicos_listar();
		/* actualizamos el almacenamiento local */
		localStorage.setItem("médicos", JSON.stringify(médicos));
	}
}

function médicos_seleccionar() {
	var pos = $("#médicos_lista").prop("selectedIndex");
	if (pos >= 0) {
		var médico = médicos[pos];
		$("#médico_id").val(médico.Id);
		$("#médico_nombre").val(médico.Nombre);
		var idEspecialidad = médico.IdEspecialidad;
		var posEspecialidad = especialidades_buscarPos(idEspecialidad);
		$("#médico_especialidad").prop("selectedIndex", posEspecialidad);
	}
}

function médicos_listar() {
	var médicos_lista = $("#médicos_lista");
	médicos_lista.empty();
	for (var pos = 0; pos < médicos.length; pos++) {
		var médico              = médicos[pos];
		var id                  = médico.Id;
		var nombre              = médico.Nombre;
		var especialidad_id     = médico.IdEspecialidad;
		var especialidad_pos    = especialidades_buscarPos(especialidad_id);
		var especialidad        = especialidades[especialidad_pos];
		var especialidad_nombre = especialidad.Nombre;
		var texto = id + " " + nombre + " " + especialidad_nombre;
		médicos_lista.append("<option>" + texto + "</option>");
	}
}