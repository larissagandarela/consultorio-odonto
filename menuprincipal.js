const readline = require('readline');
const { subMenu } = require('./submenu');
const { agendarMenu } = require('./menuagenda');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

function menu() {
    console.log("Menu Principal");
    console.log("1 - Cadastro de pacientes");
    console.log("2 - Agenda");
    console.log("3 - Fim");

    rl.question("Digite o número da opção desejada: ", (opcao) => {
        console.log(opcao);
        switch (opcao.trim()) {
            case '1':
                subMenu();
                break;
            case '2':
                agendarMenu();
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

module.exports = { menu };

menu(); 
