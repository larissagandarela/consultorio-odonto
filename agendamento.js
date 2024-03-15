const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

let listaConsultas = carregarConsultas();

module.exports = { agendarConsulta, listaConsultas, adicionarConsulta };

function carregarConsultas() {
    try {
        const data = fs.readFileSync('consultas.json');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function salvarConsultas() {
    const data = JSON.stringify(listaConsultas);
    fs.writeFileSync('consultas.json', data);
    console.log('Consultas salvas com sucesso!');
}

function verificarSobreposicao(dataConsulta, horaIni, minIni, horaFin, minFin) {
    const inicioProposto = new Date(dataConsulta.getFullYear(), dataConsulta.getMonth(), dataConsulta.getDate(), horaIni, minIni);
    const fimProposto = new Date(dataConsulta.getFullYear(), dataConsulta.getMonth(), dataConsulta.getDate(), horaFin, minFin);

    return listaConsultas.some(consulta => {
        const inicioConsulta = new Date(consulta.data);
        const fimConsulta = new Date(consulta.data);
        fimConsulta.setHours(parseInt(consulta.horaFinal.split(':')[0]), parseInt(consulta.horaFinal.split(':')[1]));

        return (inicioProposto < fimConsulta && fimProposto > inicioConsulta);
    });
}

function adicionarConsulta(cpf, consulta) {
    const paciente = listaPacientes.find(paciente => paciente.cpf === cpf);
    if (paciente) {
        if (!paciente.consultas) {
            paciente.consultas = [];
        }
        paciente.consultas.push(consulta);
        console.log("Consulta agendada com sucesso!");
        salvarPacientes();
    } else {
        console.log(`Não foi possível encontrar um paciente com o CPF ${cpf}.`);
    }
}

function agendarConsulta() {
    rl.question("Digite o CPF do paciente: ", (cpf) => {
        rl.question("Digite a data da consulta (DD/MM/AAAA): ", (dataConsulta) => {
            rl.question("Digite a hora inicial da consulta (HHMM): ", (horaInicial) => {
                rl.question("Digite a hora final da consulta (HHMM): ", (horaFinal) => {
                    const currentDate = new Date();
                    const [dia, mes, ano] = dataConsulta.split('/').map(Number);
                    const [horaIni, minIni] = horaInicial.split(':').map(Number);
                    const [horaFin, minFin] = horaFinal.split(':').map(Number);

                    if (minIni % 15 !== 0 || minFin % 15 !== 0) {
                        console.log("Erro: as horas devem ser em intervalos de 15 minutos");
                        rl.close();
                        return;
                    }

                    const totalMinutosIni = horaIni * 60 + minIni;
                    const totalMinutosFin = horaFin * 60 + minFin;

                    if (totalMinutosIni < 480 || totalMinutosIni > 1140) {
                        console.log("Erro: a hora inicial deve estar entre 8:00 e 19:00");
                        rl.close();
                        return;
                    }

                    if (totalMinutosFin < 480 || totalMinutosFin > 1140) {
                        console.log("Erro: a hora final deve estar entre 8:00 e 19:00");
                        rl.close();
                        return;
                    }

                    const dataConsultaObj = new Date(ano, mes - 1, dia);
                    dataConsultaObj.setHours(horaIni, minIni);

                    if (dataConsultaObj <= currentDate) {
                        console.log("Erro: a consulta deve ser marcada para um período futuro");
                        rl.close();
                        return;
                    }

                    if (totalMinutosFin <= totalMinutosIni) {
                        console.log("Erro: hora final deve ser maior que hora inicial");
                        rl.close();
                        return;
                    }

                    if (verificarSobreposicao(dataConsultaObj, horaIni, minIni, horaFin, minFin)) {
                        console.log("Erro: já existe uma consulta agendada nesse horário");
                        rl.close();
                        return;
                    }

                    const agendamento = {
                        cpf: cpf,
                        data: dataConsulta,
                        horaInicial: horaInicial,
                        horaFinal: horaFinal
                    };

                    listaConsultas.push(agendamento);
                    salvarConsultas();
                    console.log("Agendamento realizado com sucesso!");
                    rl.close();
                });
            });
        });
    });
}


