const readline = require('readline');
const moment = require('moment');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

let listaPacientes = carregarPacientes();

module.exports = { adicionarPaciente, listaPacientes };

function carregarPacientes() {
    try {
        const data = fs.readFileSync('pacientes.json');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function salvarPacientes() {
    const data = JSON.stringify(listaPacientes);
    fs.writeFileSync('pacientes.json', data);
    console.log('Pacientes salvos com sucesso!');
}

function verificarPacienteSalvo(cpf) {
    const pacienteSalvo = listaPacientes.find(paciente => paciente.cpf === cpf);
    if (pacienteSalvo) {
        console.log(`Paciente com CPF ${cpf} está salvo.`);
    } else {
        console.log(`Paciente com CPF ${cpf} não está salvo.`);
    }
}

function adicionarPaciente() {
    rl.question("Digite o CPF do paciente: ", (cpf) => {
        if (!validarCPF(cpf)) {
            console.log("CPF inválido!!");
            adicionarPaciente(); 
            return;
        }

        if (listaPacientes.some(paciente => paciente.cpf === cpf)) {
            console.log("Já existe um paciente cadastrado com este CPF!");
            adicionarPaciente();
            return;
        }

        rl.question("Digite o nome do paciente: ", (nome) => {
            if (nome.length < 5) {
                console.log("O nome do usuário deve ter pelo menos 5 caracteres!!");
                adicionarPaciente(); 
                return;
            }

            rl.question("Digite a data de nascimento do paciente (DD/MM/AAAA): ", (dataNascimento) => {
                if (!validarDataNascimento(dataNascimento)) {
                    console.log("A data de nascimento deve ser fornecida no formato DD/MM/AAAA.");
                    adicionarPaciente(); 
                    return;
                }

                if (!verificarIdade(dataNascimento)) {
                    console.log("O paciente deve ser maior que 13 anos!!");
                    adicionarPaciente();
                    return;
                }

                let paciente = {
                    cpf: cpf,
                    nome: nome,
                    dataNascimento: dataNascimento,
                };

                listaPacientes.push(paciente);
                console.log("Paciente cadastrado com sucesso!");

                verificarPacienteSalvo(cpf);
                salvarPacientes();
            });
        });
    });
}

function validarDataNascimento(dataNascimento) {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

    return regexData.test(dataNascimento);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

function verificarIdade(dataNascimento) {
    const dataNascimentoMoment = moment(dataNascimento, 'DD/MM/YYYY');
    const idade = moment().diff(dataNascimentoMoment, 'years');
    return idade >= 13;
}

module.exports = { adicionarPaciente, salvarPacientes, listaPacientes };
