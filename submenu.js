const readline = require('readline');
const { adicionarPaciente } = require('./cadastro');
module.exports = { adicionarPaciente, subMenu };


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});


function subMenu() {
    console.log("Menu do Cadastro de Pacientes");
    console.log("1 - Cadastrar novo paciente");
    console.log("2 - Excluir paciente");
    console.log("3 - Listar pacientes (ordenado por CPF)");
    console.log("4 - Listar pacientes (ordenado por nome)")
    console.log("5 - Voltar p/ menu principal");

    rl.question("Digite o número da opção desejada: ", (opcao) => {
        console.log(opcao);
        switch (opcao.trim()) {
            case '1':
                adicionarPaciente();
                break;
            case '2':
                console.log("Função Agenda chamada.");
                break;
            case '3':
                console.log("Encerrando o programa...");
                rl.close();
                break;
            default:
                console.log("Opção inválida!");
                menu();
        }
    });
}


