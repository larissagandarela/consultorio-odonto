const readline = require('readline');
const SubMenu = require('./submenu');
const MenuAgenda = require('./menuagenda');

class MenuPrincipal {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
    }

    exibirMenu() {
        console.log("Menu Principal");
        console.log("1 - Cadastro de pacientes");
        console.log("2 - Agenda");
        console.log("3 - Fim");

        this.rl.question("Digite o número da opção desejada: ", (opcao) => {
            console.log(opcao);
            switch (opcao.trim()) {
                case '1':
                    new SubMenu().exibirSubMenu();
                    break;
                case '2':
                    new MenuAgenda().exibirMenu();
                    break;
                case '3':
                    console.log("Encerrando o programa...");
                    this.rl.close();
                    break;
                default:
                    console.log("Opção inválida!");
                    this.exibirMenu();
            }
        });
    }
}

module.exports = MenuPrincipal;

new MenuPrincipal().exibirMenu();
