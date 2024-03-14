const readline = require('readline');
const { listaPacientes } = require('./cadastro');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

function agendarMenu() {
    console.log("Agenda");
    console.log("1 - Agendar consulta");
    console.log("2 - Cancelar agendamento");
    console.log("3 - Listar agenda");
    console.log("4 - Voltar p/ menu principal");

    rl.question("Digite o número da opção desejada: ", (opcao) => {
        switch (opcao.trim()) {
            case '1':
                agendarConsulta();
                break;
            case '2':
                console.log("Função Cancelar Agendamento chamada.");
                break;
            case '3':
                console.log("Listar Agenda");
                break;
            default:
                console.log("Opção inválida!");
                agendarMenu();
        }
    });
}


function agendarConsulta() {
    rl.question("Digite o CPF do paciente: ", (cpf) => {
        rl.question("Digite a data da consulta (DD/MM/AAAA): ", (dataConsulta) => {
            rl.question("Digite a hora inicial da consulta (HHMM): ", (horaInicial) => {
                rl.question("Digite a hora final da consulta (HHMM): ", (horaFinal) => {

                    const paciente = listaPacientes.find(paciente => paciente.cpf === cpf);

                    if (!paciente) {
                        console.log("CPF:", cpf);
                        console.log("Erro: paciente não cadastrado");
                        rl.close();
                        return;
                    }

                    const consultaExistente = paciente.consultas && paciente.consultas.some(consulta => {
                        return consulta.data === dataConsulta && consulta.horaInicial === horaInicial;
                    });

                    if (consultaExistente) {
                        console.log("CPF:", cpf);
                        console.log("Erro: já existe uma consulta agendada nesse horário");
                        rl.close();
                        return;
                    }

                    paciente.consultas = paciente.consultas || [];
                    paciente.consultas.push({
                        data: dataConsulta,
                        horaInicial: horaInicial,
                        horaFinal: horaFinal
                    });

                    console.log("CPF:", cpf);
                    console.log("Data da consulta:", dataConsulta);
                    console.log("Hora inicial:", horaInicial);
                    console.log("Hora final:", horaFinal);
                    console.log("Agendamento realizado com sucesso!");

                    rl.close();
                });
            });
        });
    });
}

module.exports = { agendarMenu };

