

// FUNÇÃO CODIFICAR REALIZA UM FILTRO DO TIPO DE CODIFICAÇÃO E ENCAMINHA VALORES PARA AS RESPECTIVAS CODIFICAÇÕES

function functionCodificar(){
let textoDigitado = document.querySelector('input').value;
let enigmaStatus = true;
let quantumStatus = true;


if (enigmaStatus==false) {
    standardCrptography(textoDigitado);
        
} else {
    enigmaCriptography(textoDigitado);

    
}

}

//CRIAR LOGICA PARA PEGAR O INPUT RECEBIDO E CRIPTOGRAFAR, DEPOIS EXIBIR MSG CRIPTOGRAFADA NA FUNÇÃO OUTPUT
function standardCrptography(inputrecebido) {
    console.log("standard cripto starting");
    let msgCriptografada = `${inputrecebido} criptografado com standard`;
    exibirOutput(msgCriptografada);
}


//CRIAR LOGICA PARA PEGAR O INPUT RECEBIDO E CRIPTOGRAFAR DE ACORDO COM REGRAS DA ENIGMA, DEPOIS EXIBIR MSG CRIPTOGRAFADA NA FUNÇÃO OUTPUT

function enigmaCriptography(inputrecebido) {
    console.log("enigmacripto starting")
    let msgCriptografada = `${inputrecebido} criptografado com Enigma`;
    exibirOutput(msgCriptografada);
}


//Criptografia Assimetrica RSA 2048


//FUNÇÃO OUTPUT USADA PARA PREENCHER O OUTPUT, PODE SER CHAMADA PELAS CRIPTAÇÕES OU DECRIPTAÇÕES
function exibirOutput(msgdeoutput) {
    let campoOutput= document.querySelector('output');
    campoOutput.innerHTML = msgdeoutput;
    
}