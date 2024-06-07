/* Gestión del objeto Paciente
	array       : pacientes[]
	almacenamos : localStorage
	métodos     : ABM           */

var pacientes = [];

/* Inicializamos un almacenamiento local */
function pacientes_inicializar() {
	if (localStorage.getItem("pacientes") === null)
		localStorage.setItem("pacientes", "");
	else {
		var datos = localStorage.getItem("pacientes");
		if (datos != "")
			pacientes = JSON.parse(datos);
	}
}

/* Métodos auxiliares*/
function pacientes_buscarPos(id) {
	for (var pos = 0; pos < pacientes.length; pos++)
		if (id == pacientes[pos].Id)
			return pos;
	return -1;
}

function pacientes_limpiarCampos() {
	$("#paciente_id").val("");
	$("#paciente_nombre").val("");
	$("#pacientes_lista").val([]);
	$("#paciente_id").focus();
}

/* ABM Pacientes */
function pacientes_alta() {
	var id = $("#paciente_id").val();
	var pos = pacientes_buscarPos(id);
	if (pos < 0) {
		var id       = $("#paciente_id").val();
		var nombre   = $("#paciente_nombre").val();
		var paciente = {
			Id	  : id,
			Nombre: nombre
		};
		pacientes[pacientes.length] = paciente;
		pacientes_listar();
		/* Actualizamos el almacenamiento local */
		localStorage.setItem("pacientes", JSON.stringify(pacientes));
	}
	else
		alert("Ya existe un paciente con el id " + id + ".");
}

function pacientes_baja() {
	var id = $("#paciente_id").val();
	var pos = pacientes_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra un paciente con el id " + id + ".");
	else {
		pacientes.splice(pos, 1);
		pacientes_limpiarCampos();
		pacientes_listar();
		/* Actualizamos el almacenamiento local */
		localStorage.setItem("pacientes", JSON.stringify(pacientes));
	}
}

function pacientes_modificar() {
	var id = $("#paciente_id").val();
	var pos = pacientes_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra un paciente con el id " + id + ".");
	else {
		var id       = $("#paciente_id").val();
		var nombre   = $("#paciente_nombre").val();
		var paciente = {
				Id: id,
			Nombre: nombre
		};
		pacientes[pos] = paciente;
		pacientes_listar();
		/* Actualizamos el almacenamiento local */
		localStorage.setItem("pacientes", JSON.stringify(pacientes));
	}
}

function pacientes_seleccionar() {
	var pos = $("#pacientes_lista").prop("selectedIndex");
	if (pos >= 0) {
		var paciente = pacientes[pos];
		$("#paciente_id").val(paciente.Id);
		$("#paciente_nombre").val(paciente.Nombre);
	}
}

function pacientes_listar() {
	var pacientes_lista   = $("#pacientes_lista");
	var consulta_paciente = $("#consulta_paciente");
	pacientes_lista.empty();
	consulta_paciente.empty();
	for (var pos = 0; pos < pacientes.length; pos++) {
		var paciente = pacientes[pos];
		var id       = paciente.Id;
		var nombre   = paciente.Nombre;
		var texto    = id + " " + nombre;
		var elemento = "<option>" + texto + "</option>";
		pacientes_lista.append(elemento);
		consulta_paciente.append(elemento);
	}
	consultas_listar();
}