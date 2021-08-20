const dinosaur = document.querySelector('.dinosaur');
const background = document.querySelector('.background');
let isJump = false; // feita para controlar velocidade que pressiona a tecla e pula
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) /* 32 é o código de tecla do "espaço", encontrado no http://keycode.info. */ {
        if (!isJump) {
        jump();
        }  
    }
}

function jump() {
    isJump = true; // feita para controlar velocidade que pressiona a tecla e pula
    let upInt = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInt); // interrompe intervalo informado.
            
            let downInt = setInterval (() => {
                if (position <= 0) {
                    clearInterval(downInt);
                    isJump = false; // feita para controlar velocidade que pressiona a tecla e pula
                }else {
                position -= 20;
                dinosaur.style.bottom = position + 'px'; //faz descer
                }
            }, 20);
        }else {
        position += 20;
        dinosaur.style.bottom = position + 'px'; // faz subir.
        }
    }, 20);// setInterval define que o código será executado a cada 20(colocado no final) milissegundos.
}

//Crianção dos obstáculos
function createCactus() {
    const cactus = document.createElement('div'); //cria o elemento cacto
    let cactusPosition = 1000; // define a posição onde será gerado
    let randomizer = Math.random() * 5500; // deixa a criação aleátoria
 
    cactus.classList.add('cactus'); // add o cacto
    cactus.style.left = 1000 + 'px'; // move o cacto
    background.appendChild(cactus); 

    let leftInt = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInt);
            background.removeChild(cactus); // remove o cacto que passou da tela
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { // colisão
            clearInterval(leftInt);
            document.body.innerHTML = '<h1 class= "gameover">Fim de Jogo</h1>'; //apaga tudo para deixar só o "gameover"
        }else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px'; // continua a geração de cacto
        }
    }, 20);
    setTimeout(createCactus, randomizer);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);

