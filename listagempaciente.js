const { GestorPacientes } = require('./cadastro.js');

class ListagemPacientes extends GestorPacientes {
    constructor() {
        super();
    }

    listarPorCPF() {
        console.log("------------------------------------------------------------");
        console.log("CPF   Nome                                Dt.Nasc.   Idade");
        console.log("------------------------------------------------------------");
        this.listaPacientes.sort((a, b) => a.cpf.localeCompare(b.cpf)).forEach(paciente => {
            console.log(`${paciente.cpf} ${this.formatarNome(paciente.nome)} ${this.formatarData(paciente.dataNascimento)} ${this.calcularIdade(paciente.dataNascimento)}`);
        });
        console.log("------------------------------------------------------------");
    }

    listarPorNome() {
        console.log("------------------------------------------------------------");
        console.log("CPF   Nome                                Dt.Nasc.   Idade");
        console.log("------------------------------------------------------------");
        this.listaPacientes.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(paciente => {
            console.log(`${paciente.cpf} ${this.formatarNome(paciente.nome)} ${this.formatarData(paciente.dataNascimento)} ${this.calcularIdade(paciente.dataNascimento)}`);
        });
        console.log("------------------------------------------------------------");
    }
}

module.exports = ListagemPacientes;
