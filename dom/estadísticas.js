function inicializar() {
	especialidades_inicializar();
	médicos_inicializar();
	pacientes_inicializar();
	consultas_inicializar();
	inicializar1();
	inicializar2();
}

//
// 1) Dado un paciente, mostrar la fecha y el turno que tiene.
//

function inicializar1() {
	var lista = $("#pacientes");
	lista.empty();
	
	for (var pos = 0; pos < pacientes.length; pos++) {
		var paciente = pacientes[pos];
		var id       = paciente.Id;
		var nombre   = paciente.Nombre;
		texto        = id + " " + nombre;
		lista.append("<option>" + texto + "</option>");
	}
}

function ejercicio1() {
	$("#ejercicio1").html(resultado1());
}

function resultado1() {
	var paciente_pos = $("#pacientes").prop("selectedIndex");
	var paciente_id  = pacientes[paciente_pos].Id;
	
	for (var i = 0; i < consultas.length; i++) {
		var consulta = consultas[i];
		if (paciente_id == consulta.IdPaciente)
			return "fecha " + consulta.Fecha + " y turno " + consulta.Turno;
	}
	return "No agendó consulta.";
}

//
// 2) Dado un médico, mostrar todos los pacientes que atiende.
//

function inicializar2() {
	var lista = $("#médicos");
	lista.empty();
	for (var pos = 0; pos < médicos.length; pos++) {
		var médico              = médicos[pos];
		var id                  = médico.Id;
		var nombre              = médico.Nombre;
		var especialidad_id     = médico.IdEspecialidad;
		var especialidad_pos    = especialidades_buscarPos(especialidad_id);
		var especialidad_nombre = especialidades[especialidad_pos].Nombre;
		var texto               = id + " " + nombre + " " + especialidad_nombre;
		lista.append("<option>" + texto + "</option>");
	}
}

function ejercicio2() {
	$("#ejercicio2").html(resultado2());
}

function resultado2() {
	var médico_pos = $("#médicos").prop("selectedIndex");
	var médico_id = médicos[médico_pos].Id;
	var html = "";
	for (var pos = 0; pos < consultas.length; pos++) {
		var consulta = consultas[pos];
		if (médico_id == consulta.IdMédico) {
			var paciente_id     = consulta.IdPaciente;
			var paciente_pos    = pacientes_buscarPos(paciente_id);
			var paciente        = pacientes[paciente_pos];
			var paciente_nombre = paciente.Nombre;
			html += paciente_id + " " + paciente_nombre + "<br>";
		}
	}
	if (html == "")
		return "No tiene pacientes.";
	else
		return html;
}