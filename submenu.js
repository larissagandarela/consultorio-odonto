const readline = require('readline');
const { adicionarPaciente } = require('./cadastro');

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
    console.log("4 - Listar pacientes (ordenado por nome)");
    console.log("5 - Voltar p/ menu principal");

    rl.question("Digite o número da opção desejada: ", (opcao) => {
        console.log(opcao);
        switch (opcao.trim()) {
            case '1':
                adicionarPaciente();
                break;
            case '2':
                console.log("Função Excluir paciente chamada.");
                break;
            case '3':
                console.log("Listar pacientes (ordenado por CPF) chamada.");
                break;
            case '4':
                console.log("Listar pacientes (ordenado por nome) chamada.");
                break;
            case '5':
                console.log("Voltando para o menu principal...");
                break; // Não é necessário fazer mais nada, o menu principal já será exibido novamente
            default:
                console.log("Opção inválida!");
                subMenu(); // Chamada recursiva para exibir novamente o submenu
        }
    });
}

module.exports = { subMenu };
