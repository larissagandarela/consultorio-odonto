const readline = require('readline');
const { adicionarPaciente } = require('./cadastro');
const { excluirPaciente } = require('./excluir');


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
                rl.question("Digite o CPF do paciente que deseja excluir: ", (cpf) => {
        excluirPaciente(cpf);
                });
                break;
            case '3':
                console.log("Listar pacientes (ordenado por CPF) chamada.");
                break;
            case '4':
                console.log("Listar pacientes (ordenado por nome) chamada.");
                break;
            case '5':
                console.log("Voltando para o menu principal...");
                break; 
            default:
                console.log("Opção inválida!");
                subMenu(); 
        }
    });
}

module.exports = { subMenu };
