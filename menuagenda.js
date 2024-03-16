const fs = require('fs');
const readline = require('readline');
const GestorConsultas = require('./agendamento');
const ExcluirAgendamento = require('./excluiragenda');



class MenuAgenda {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
    }

    exibirMenu() {
        console.log("Agenda");
        console.log("1 - Agendar consulta");
        console.log("2 - Cancelar agendamento");
        console.log("3 - Listar agenda");
        console.log("4 - Voltar para o menu principal");
    
        this.rl.question("Digite o número da opção desejada: ", (opcao) => {
            switch (opcao.trim()) {
                case '1':
                    new GestorConsultas().agendarConsulta();
                    break;
                case '2':
                    this.rl.question("Digite o CPF do paciente: ", (cpf) => {
                        this.rl.question("Digite a data da consulta (DD/MM/AAAA): ", (dataConsulta) => {
                            this.rl.question("Digite a hora inicial da consulta (HHMM): ", (horaInicial) => {
                                new ExcluirAgendamento().excluirAgendamento(cpf, dataConsulta, horaInicial);
                            });
                        });
                    });
                    break;
                case '3':
                    console.log("Voltar para o menu principal - Implementação pendente");
                    break;
                case '4':
                    // Implemente a lógica para voltar ao menu principal, se necessário
                    console.log("Voltar para o menu principal - Implementação pendente");
                    break;
                default:
                    console.log("Opção inválida!");
            }
        });
    }
}    

module.exports = MenuAgenda;
