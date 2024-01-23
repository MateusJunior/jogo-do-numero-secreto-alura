//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){    
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirTextoNaTela('h1', 'Jogo do número secreto!');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');

//https://github.com/alura-cursos/js-curso-2/tree/desafio_3
function verificarChute (){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? `tentativas`: `tentativa`
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);        
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor.');         
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior.');         
        }
        tentativas++;
        limparCampo();
    }
    console.log(chute == numeroSecreto);
}

function gerarNumeroAleatorio(){
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
   let numerEscolhido = parseInt(Math.random() * numeroLimite + 1);

   if(quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
   }
   
   if(listaDeNumerosSorteados.includes(numerEscolhido)){
        return gerarNumeroAleatorio();
   }else{
        listaDeNumerosSorteados.push(numerEscolhido);
        console.log(listaDeNumerosSorteados);
        return numerEscolhido;
   }
   
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto!');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}:`);
}
function limparCampo(){
    chute = document.querySelector(`input`);
    chute.value = ``;
}
function reiniciarJogo(){ 
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}