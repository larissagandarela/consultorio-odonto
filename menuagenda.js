const fs = require('fs');
const readline = require('readline');
const { agendarConsulta } = require('./agendamento')

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


module.exports = { agendarMenu };

