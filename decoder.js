// FUNÇÃO CODIFICAR REALIZA UM FILTRO DO TIPO DE CODIFICAÇÃO E ENCAMINHA VALORES PARA AS RESPECTIVAS CODIFICAÇÕES

function Codificar(){
    let textoDigitado = document.getElementsByClassName('mainpage__input__textfield')[0].value;
    let standardcrypto = true;
    // let quantumStatus = true;

    if (standardcrypto==true) {
        standardCriptography(textoDigitado);      
    } else {
        enigmaCriptography(textoDigitado);    
    }
}

//CRIAR LOGICA PARA PEGAR O INPUT RECEBIDO E CRIPTOGRAFAR, DEPOIS EXIBIR MSG CRIPTOGRAFADA NA FUNÇÃO OUTPUT
function standardCriptography(inputrecebido) {
    console.log(inputrecebido);
    let msgCriptografada ='';
    for (let i = 0; i < inputrecebido.length; i++) {
        let element = inputrecebido[i];
        console.log(element);
        if (element=='e') {
            console.log('entrou no if');
            element='enter';
            msgCriptografada=msgCriptografada+element;
        } else if(element=='i'){
            element='imes';
            msgCriptografada=msgCriptografada+element;
        } else if(element=='a'){
            element='ai';
            msgCriptografada=msgCriptografada+element;
        } else if(element=='o'){
            element='ober';
            msgCriptografada=msgCriptografada+element;
        } else if(element=='u'){
            element='ufat';
            msgCriptografada=msgCriptografada+element;
        } else{
            msgCriptografada=msgCriptografada+element;
        }
    }
    console.log(msgCriptografada);
    console.log(msgCriptografada.length);
    exibirOutput(msgCriptografada);
}

//CRIAR LOGICA PARA PEGAR O INPUT RECEBIDO E CRIPTOGRAFAR DE ACORDO COM REGRAS DA ENIGMA, DEPOIS EXIBIR MSG CRIPTOGRAFADA NA FUNÇÃO OUTPUT

// function enigmaCriptography(inputrecebido) {
//     console.log("enigmacripto starting")
//     let msgCriptografada = `${inputrecebido} criptografado com Enigma`;
//     exibirOutput(msgCriptografada);
// }


// CRIPTOGRAFIA ASSIMETRICA 2048

// function enigmaCriptography(inputrecebido) {
//     console.log("enigmacripto starting")
//     let msgCriptografada = `${inputrecebido} criptografado com Enigma`;
//     exibirOutput(msgCriptografada);
// }


function Decodificar() {
    let textoDigitado = document.getElementsByClassName('mainpage__input__textfield')[0].value;
    console.log(textoDigitado);
    let standardcrypto = true;
    // let quantumStatus = true;

    if (standardcrypto==true) {
        standardDecryptography(textoDigitado);      
    } else {
        enigmaCriptography(textoDigitado);    
    }
    
}

//CRIAR LOGICA PARA PEGAR O INPUT RECEBIDO E DESCRIPTOGRAFAR, DEPOIS EXIBIR MSG DESCRIPTOGRAFADA NA FUNÇÃO OUTPUT

function standardDecryptography(inputrecebido) {
    console.log(inputrecebido);
    let msgCriptografada ='';
    for (let i = 0; i < inputrecebido.length; i++) {
        let element=inputrecebido;
        console.log(i);
        if (element[i]=='e' && element[i+1]=='n'&& element[i+2]=='t'&& element[i+3]=='e'&& element[i+4]=='r') {
            console.log('entrou no if');
            element='e';
            msgCriptografada=msgCriptografada+element;
            i=i+4;
        } else if(element[i]=='i'&& element[i+1]=='m' && element[i+2]=='e' &&  element[i+3]=='s'){
            element='i';
            msgCriptografada=msgCriptografada+element;
            i=i+3;
        } else if(element[i]=='a' && element[i+1]=='i'){
            element='a';
            msgCriptografada=msgCriptografada+element;
            i=i+1;
        } else if(element[i]=='o' && element[i+1]=='b' && element[i+2]=='e'&& element[i+3]=='r'){
            element='o';
            msgCriptografada=msgCriptografada+element;
            i=i+3;
        } else if(element[i]=='u' && element[i+1]=='f'&& element[i+2]=='a' && element[i+3]=='t'){
            element='u';
            msgCriptografada=msgCriptografada+element;
            i=i+3;
        } else{
            msgCriptografada=msgCriptografada+element[i];
        }
    }
    console.log(msgCriptografada);
    console.log(msgCriptografada.length);
    exibirOutput(msgCriptografada);
}

//CRIAR LOGICA PARA PEGAR O INPUT RECEBIDO E DESCRIPTOGRAFAR DE ACORDO COM REGRAS DA ENIGMA, DEPOIS EXIBIR MSG DESCRIPTOGRAFADA NA FUNÇÃO OUTPUT

// function enigmaDecriptography(inputrecebido) {
//     let msgDescriptografada = `${inputrecebido} descriptografado com Enigma`;
//     exibirOutput(msgDescriptografada);
// }


// DESCRIPTOGRAFIA ASSIMETRICA 2048

// function AssimetricDecriptography(inputrecebido) {
//     console.log("enigmacripto starting")
//     let msgDescriptografada = `${inputrecebido} descriptografado com Enigma`;
//     exibirOutput(msgDescriptografada);
// }



//FUNÇÃO OUTPUT USADA PARA PREENCHER O OUTPUT, PODE SER CHAMADA PELAS CRIPTAÇÕES OU DECRIPTAÇÕES
function exibirOutput(msgdeoutput) {
    console.log(document.getElementsByClassName('mainpage__output__textfield__image')[0]);
    if (document.getElementsByClassName('mainpage__output__textfield__image')[0].hidden == false) {
        document.getElementsByClassName('mainpage__output__textfield__image')[0].hidden = true;
        let element = document.getElementsByClassName("mainpage__output__textfield__texts")[0];
        element.remove();
        document.getElementsByClassName("mainpage__output__textfield__texts")[0].innerHTML = msgdeoutput;


    } else{
        document.getElementsByClassName("mainpage__output__textfield__texts")[0].innerHTML = msgdeoutput;
    }
    
}

// FUNÇÃO DE COPIAR O TEXTO NO OUTPUT PARA A ÁREA DE TRANSFERÊNCIA

function copiarTexto(){
    let textCriptographed = document.getElementsByClassName('mainpage__output__textfield__texts')[0].innerHTML;
    console.log(textCriptographed);
    navigator.clipboard.writeText(textCriptographed);

}


//LIMPA CAMPO TEXTO PARA NOVO TEXTO.

function apagaTexto(){
    let textoInicial = "Digite seu Texto...";
    let textoNoCampo = document.getElementsByClassName('mainpage__input__textfield')[0].value;

    if (textoNoCampo==textoInicial) {
        document.getElementsByClassName('mainpage__input__textfield')[0].value ='';

        
    } else{
        console.log('entrou no else');
    }    
}


