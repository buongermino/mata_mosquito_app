var altura;
var largura;
var vidas = 3;
var tempo = 10;

var criaMosquitoTempo = 1500

var nivel = window.location.search

//funcao replace substitui o primeiro parametro pelo segundo
nivel = nivel.replace('?','')

//Lógica para definir a dificuldade do jogo
if(nivel === 'normal')
{
    criaMosquitoTempo = 1500
}
else
    if(nivel === 'dificil')
    {
        criaMosquitoTempo = 1000
    }
    else
        if (nivel === 'modoJedi')
        {
            criaMosquitoTempo = 750
        }


//Ajusta a área de jogo conforme redimensionamento da janela
function ajustaTamanhoPalcoJogo() 
{
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function()
{
    tempo -= 1

    //interrompe o cronometro e a criação dos mosquitos
    if (tempo < 0)
    {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = "vitoria.html"
    }
    else
    {
        //adiciona o conteudo da var tempo a um elemento dentro das tags html
        document.getElementById('cronometro').innerHTML = tempo    
    }    
    
}, 1000)


function posicaoRandomica()
{
    //remover o mosquito anterior (caso exista)
    if(document.getElementById('mosquito'))
    {    
    document.getElementById('mosquito').remove()

    //console.log('elemento selecionado foi: v' + vidas)

        if (vidas < 1)
        {
            window.location.href = "game_over.html"
        }
        else
        {
        document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
        vidas--
        }
    }    


    //Math.Random gera numero aleatorios de 0 a 1
    //Math.Floor arredonda um valor para baixo
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) -90
    //OBS: -90 pois o maior mosquito tem 90 x 90px, dessa forma não ficará fora da tela


    //Op ternário (if simplificado)
    posicaoX = posicaoX < 0 ? 0  : posicaoX
    posicaoY = posicaoY < 0 ? 0  : posicaoY

    console.log(posicaoY, posicaoX)

    //----------criar elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'

    mosquito.onclick = function()
    {
        this.remove()
    }
    //---------------------------

    document.body.appendChild(mosquito)
}

//Define aleatoriamente qual tamanho sera o mosquito
function tamanhoAleatorio()
{
    var classe = Math.floor(Math.random() * 3)
    console.log(classe)

    //não é necessario break pois o return ja encerrará a função
    switch(classe)
    {
        case 0: return 'mosquito1'

        case 1: return 'mosquito2'

        case 2: return 'mosquito3'
    }
}

//define qual direção estará virado o mosquito <- ou ->, conforme setado nas classes CSS
function ladoAleatorio()
{
    var classe = Math.floor(Math.random() * 2) //multiplicar por 2 retornará 0 ou 1
    console.log(classe)

    switch(classe)
    {
        case 0: return 'ladoA'

        case 1: return 'ladoB'
    }
}