const readline = require('readline');
const moment = require('moment');
const fs = require('fs');
const { listaPacientes, salvarPacientes } = require('./cadastro');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});


function excluirPaciente(cpf) {
    const pacienteIndex = listaPacientes.findIndex(paciente => paciente.cpf === cpf);

    if (pacienteIndex === -1) {
        console.log(`Não foi possível encontrar um paciente com o CPF ${cpf} para exclusão.`);
        return;
    }

    const paciente = listaPacientes[pacienteIndex];

    if (paciente.consultas && paciente.consultas.some(consulta => moment(consulta.data, 'DD/MM/YYYY').isAfter(moment(), 'day'))) {
        console.log(`O paciente com CPF ${cpf} possui consultas agendadas no futuro e não pode ser excluído.`);
        return;
    }

    listaPacientes.splice(pacienteIndex, 1);
    console.log(`Paciente com CPF ${cpf} excluído com sucesso!`);

    if (paciente.consultas) {
        paciente.consultas = paciente.consultas.filter(consulta => !moment(consulta.data, 'DD/MM/YYYY').isBefore(moment(), 'day'));
        salvarPacientes();
        console.log(`Consultas passadas do paciente com CPF ${cpf} também foram excluídas.`);
    }

    salvarPacientes();
}

module.exports = { excluirPaciente };
