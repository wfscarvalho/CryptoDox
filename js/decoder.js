class Enigma {
    constructor() {
        // Enigma machine components based on historical Enigma I
        this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // Rotors (wiring and notch)
        this.rotors = {
            I:   { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" },
            II:  { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E" },
            III: { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V" }
        };

        // Reflector B
        this.reflector = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

        // Current state (using standard setup: Rotors I, II, III from left to right)
        this.leftRotor = this.rotors.I;
        this.middleRotor = this.rotors.II;
        this.rightRotor = this.rotors.III;

        // Positions (0-25)
        this.leftPos = 0;
        this.middlePos = 0;
        this.rightPos = 0;
    }

    setPositions(left, middle, right) {
        this.leftPos = this.alphabet.indexOf(left);
        this.middlePos = this.alphabet.indexOf(middle);
        this.rightPos = this.alphabet.indexOf(right);
    }

    step() {
        // Enigma stepping mechanism (simplified double stepping anomaly)
        let rightAtNotch = this.rightPos === this.alphabet.indexOf(this.rightRotor.notch);
        let middleAtNotch = this.middlePos === this.alphabet.indexOf(this.middleRotor.notch);

        if (middleAtNotch) {
            this.leftPos = (this.leftPos + 1) % 26;
            this.middlePos = (this.middlePos + 1) % 26;
        } else if (rightAtNotch) {
            this.middlePos = (this.middlePos + 1) % 26;
        }

        // Right rotor always steps
        this.rightPos = (this.rightPos + 1) % 26;
    }

    processChar(char) {
        char = char.toUpperCase();
        if (!this.alphabet.includes(char)) {
            return char; // Return non-alphabet characters as is
        }

        this.step();

        let c = this.alphabet.indexOf(char);

        // Forward through rotors
        c = this.passRotor(c, this.rightRotor, this.rightPos, false);
        c = this.passRotor(c, this.middleRotor, this.middlePos, false);
        c = this.passRotor(c, this.leftRotor, this.leftPos, false);

        // Reflector
        c = this.alphabet.indexOf(this.reflector[c]);

        // Backward through rotors
        c = this.passRotor(c, this.leftRotor, this.leftPos, true);
        c = this.passRotor(c, this.middleRotor, this.middlePos, true);
        c = this.passRotor(c, this.rightRotor, this.rightPos, true);

        return this.alphabet[c];
    }

    passRotor(c, rotor, pos, reverse) {
        let offset = pos;
        let charIndex = (c + offset) % 26;
        let mappedCharIndex;

        if (!reverse) {
            mappedCharIndex = this.alphabet.indexOf(rotor.wiring[charIndex]);
        } else {
            mappedCharIndex = rotor.wiring.indexOf(this.alphabet[charIndex]);
        }

        let outIndex = (mappedCharIndex - offset + 26) % 26;
        return outIndex;
    }

    processString(str) {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            result += this.processChar(str[i]);
        }
        return result;
    }
}

// Global instance of Enigma
const enigmaMachine = new Enigma();
enigmaMachine.setPositions('A', 'A', 'A'); // Initial positions


// FUNÇÃO CODIFICAR REALIZA UM FILTRO DO TIPO DE CODIFICAÇÃO E ENCAMINHA VALORES PARA AS RESPECTIVAS CODIFICAÇÕES

function Codificar(){
    let textoDigitado = document.getElementsByClassName('mainpage__input__textfield')[0].value;

    // Process input text with Enigma Machine
    // Enigma is symmetric, so encode and decode are the same operation,
    // but in this chat simulator we encrypt the plaintext here.
    let textoCriptografado = enigmaMachine.processString(textoDigitado);

    exibirChat(textoDigitado, textoCriptografado, 'codificar');

    // Clear the input textfield
    document.getElementsByClassName('mainpage__input__textfield')[0].value = '';
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
    
    // Process input text with Enigma Machine
    // Enigma is symmetric, so encode and decode are the same operation.
    // However, when decoding we assume the input is cipher text and output is plain text.
    let textoDescriptografado = enigmaMachine.processString(textoDigitado);

    exibirChat(textoDigitado, textoDescriptografado, 'decodificar');

    // Clear the input textfield
    document.getElementsByClassName('mainpage__input__textfield')[0].value = '';
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
function exibirChat(inputMsg, outputMsg, type) {
    let upperGroup = document.getElementsByClassName('mainpage__output__textfield__uppergroup')[0];

    // Hide default image and text if present
    let defaultImg = document.getElementsByClassName('mainpage__output__textfield__image')[0];
    if (defaultImg && defaultImg.hidden == false) {
        defaultImg.hidden = true;

        let texts = document.querySelectorAll(".mainpage__output__textfield__texts");
        texts.forEach(textElement => textElement.style.display = 'none');
    }

    // Create user bubble
    let userBubble = document.createElement('div');
    userBubble.classList.add('chat-bubble', 'user-bubble');
    userBubble.innerHTML = `<p>${inputMsg}</p>`;

    // Create enigma bubble
    let enigmaBubble = document.createElement('div');
    enigmaBubble.classList.add('chat-bubble', 'enigma-bubble');
    enigmaBubble.innerHTML = `<p>${outputMsg}</p>`;

    // Add bubbles to the container
    upperGroup.appendChild(userBubble);
    upperGroup.appendChild(enigmaBubble);

    // Auto-scroll to bottom
    upperGroup.scrollTop = upperGroup.scrollHeight;

    // For copying text later
    let lastText = document.createElement('span');
    lastText.classList.add('last-output-msg');
    lastText.style.display = 'none';
    lastText.innerText = outputMsg;
    
    // Keep a hidden element with the latest output for copy functionality to use
    let existingLastMsg = document.querySelector('.last-output-msg');
    if (existingLastMsg) {
        existingLastMsg.remove();
    }
    upperGroup.appendChild(lastText);
}

function exibirOutput(msgdeoutput) {
    // Keep standard functionality for backwards compatibility if needed
    // Not strictly needed anymore since we switched to Chat UI, but keeping standard ones
}

// FUNÇÃO DE COPIAR O TEXTO NO OUTPUT PARA A ÁREA DE TRANSFERÊNCIA

function copiarTexto(){
    let lastMsg = document.querySelector('.last-output-msg');
    if (lastMsg) {
        let textCriptographed = lastMsg.innerText;
        console.log("Copying:", textCriptographed);
        navigator.clipboard.writeText(textCriptographed);
    } else {
        console.log("No text to copy");
    }
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


