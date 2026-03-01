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

    // Reset positions so repeated encoding/decoding works correctly
    enigmaMachine.setPositions('A', 'A', 'A');

    // Process input text with Enigma Machine
    // Enigma is symmetric, so encode and decode are the same operation,
    // but in this chat simulator we encrypt the plaintext here.
    let textoCriptografado = enigmaMachine.processString(textoDigitado);

    exibirChat(textoDigitado, textoCriptografado, 'codificar');

    // Clear the input textfield
    document.getElementsByClassName('mainpage__input__textfield')[0].value = '';
}

function Decodificar() {
    let textoDigitado = document.getElementsByClassName('mainpage__input__textfield')[0].value;

    // Reset positions so repeated encoding/decoding works correctly
    enigmaMachine.setPositions('A', 'A', 'A');

    // Process input text with Enigma Machine
    // Enigma is symmetric, so encode and decode are the same operation.
    // However, when decoding we assume the input is cipher text and output is plain text.
    let textoDescriptografado = enigmaMachine.processString(textoDigitado);

    exibirChat(textoDigitado, textoDescriptografado, 'decodificar');

    // Clear the input textfield
    document.getElementsByClassName('mainpage__input__textfield')[0].value = '';
}

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
    let userP = document.createElement('p');
    userP.innerText = inputMsg;
    userBubble.appendChild(userP);

    // Create enigma bubble
    let enigmaBubble = document.createElement('div');
    enigmaBubble.classList.add('chat-bubble', 'enigma-bubble');
    let enigmaP = document.createElement('p');
    enigmaP.innerText = outputMsg;
    enigmaBubble.appendChild(enigmaP);

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


