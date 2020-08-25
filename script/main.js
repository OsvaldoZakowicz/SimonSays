/* ---------------------------------------JS */

//obtener botones de colores
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

//obtener boton principal
const btnEmpezar = document.getElementById('btnEmpezar')

//clase Juego
class Juego {

  //constructor
  constructor(){
    this.inicializar()
    this.generarSecuencia()
    this.siguienteNivel()
  }

  //inicio del juego
  inicializar(){
    //para que js no pierda el contexto a la hora de ejecutar cada evento, lo atamos (con bind) al this del juego
    this.elegirColor = this.elegirColor.bind(this)
    btnEmpezar.classList.add('hide') //clase .hide en css main
    this.nivel = 1
    this.colores = {
      celeste : celeste,
      violeta : violeta,
      naranja : naranja,
      verde : verde
    }
  }

  //generar valores aleatorios 0,1,2,3
  generarSecuencia(){
    /* Mapeo de secuencia de numeros al array:
        Math.random() = valores decimales [0,1)
        multiplicado por cuatro, valores decimales entre [0,3.99999)
        Math.floor() = redondeo hacia abajo para tomar solo 0,1,2,3
      */
    this.secuencia = new Array(10).fill(0).map(
      n => Math.floor(Math.random() * 4)
    )
  }

  //siguiente nivel
  siguienteNivel(){
    //iluminar secuencia
    this.iluminarSecuencia()
    //agregar eventos a los colores (elegibles en el juego)
    this.agregarEventosClick()
  }

  /* transformar numero de la secuencia (cada uno de los contenidos en el array secuencia), a un color */
  transformarNumeroAColor(num){
    switch(num){
      case 0 :
        return 'celeste'
        //como es un return, no necesito usar break
      case 1 :
        return 'violeta'
      case 2 :
        return 'naranja'
      case 3 :
        return 'verde'
    }
  }

  /* cada color resultante de la secuencia transformada debe adoptar una clase para que se 'ilumine' por un momento, 
  luego esa clase se debe quitar devolviendo el estado del color al inicial */
  iluminarColor(color){
    //esta es una secuencia de colores, contiene los elementos html (div) segun su id color
    //iluminar color ingresando la clase light
    this.colores[color].classList.add('light')
    //luego de 350ms, llamar a apagar color
    setTimeout(() => this.apagarColor(color), 350)
  }

  //apaga el color sacando la clase light
  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  /* Recorrer el array de colores hasta el nivel de juego */
  iluminarSecuencia(){
    //importante el uso de let y const para no sobreescribir el bloque
    for(let i = 0; i < this.nivel; i++){
      //por cada numero, transformar la secuencia a color y asignar 
      const color = this.transformarNumeroAColor(this.secuencia[i])
      //iluminamos el color, cada repeticion del for, multiplicando al setTimeout() * i segundos, asi la secuencia se ilumina correctamente
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  //agregar evento a cada boton 'color' elegible en el juego
  agregarEventosClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }

  //evento de cada boton 'color', esta atado (bind) al 'this' del juego
  elegirColor(ev){
    console.log(ev)
  }
}

function empezarJuego(){
  let juego = new Juego();
}