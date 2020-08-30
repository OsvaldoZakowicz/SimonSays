/* ---------------------------------------JS */
//*constantes de juego
const ULTIMO_NIVEL = 5
const NOMBRE_JUGADOR = []

//*obtener botones de colores
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

//*obtener boton principal
const btnEmpezar = document.getElementById('btnEmpezar')

//*obtener campo de turno
let turno = document.getElementById('turno')
//*crear nodo de texto simon
let simon = document.createTextNode('Simon')
//*Crear nodo de texto jugador
let jugador

//*clase Juego
class Juego {

  //*constructor
  constructor(){
    this.inicializar()
    this.inicializar = this.inicializar.bind(this)
    this.generarSecuencia()
    //*comenzar el nivel luego de 500ms
    setTimeout(this.siguienteNivel, 500)
  }

  //*inicio del juego
  inicializar(){
    //*para que js no pierda el contexto a la hora de ejecutar cada evento, lo atamos (con bind) al this del juego
    this.elegirColor = this.elegirColor.bind(this)
    //*para que al ejecutar un setTimeout(siguienteNivel), el encargado de ejecutarlo sea 'Juego' y no 'Window'
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      celeste : celeste,
      violeta : violeta,
      naranja : naranja,
      verde : verde
    }
  }

  //*iniciar el boton de empezar
  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }

  //*generar valores aleatorios 0,1,2,3
  generarSecuencia(){
    /* 
    *Mapeo de secuencia de numeros al array:
      *Math.random() = valores decimales [0,1)
      *multiplicado por cuatro, valores decimales entre [0,3.99999)
      *Math.floor() = redondeo hacia abajo para tomar solo 0,1,2,3
    */
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(
      n => Math.floor(Math.random() * 4)
    )
  }

  //*siguiente nivel
  siguienteNivel(){
    //*turno de simon
    this.turnoSimon()
    //*nivel intermedio, para verificar la secuencia que ingresa el usuario
    this.subNivel = 0
    //*iluminar secuencia
    this.iluminarSecuencia()
    //*agregar eventos a los colores (elegibles en el juego)
    this.agregarEventosClick()
  }

  //*turno de simon
  turnoSimon(){
    if(turno.contains(jugador) === true){
      turno.removeChild(jugador)
    }
    if(turno.contains(simon) === false){
      turno.appendChild(simon)
    }
  }

  //*transformar numero de la secuencia (cada uno de los contenidos en el array secuencia), a un color
  transformarNumeroAColor(num){
    switch(num){
      case 0 :
        return 'celeste'
        //*como es un return, no necesito usar break
      case 1 :
        return 'violeta'
      case 2 :
        return 'naranja'
      case 3 :
        return 'verde'
    }
  }

  //*transformar un color a uno de los numeros de secuencia correspondientes
  transformarColorANumero(color){
    switch(color){
      case 'celeste' :
        return 0
      case 'violeta' :
        return 1
      case 'naranja' :
        return 2
      case 'verde' :
        return 3
    }
  }

  /*
  *cada color resultante de la secuencia transformada debe adoptar una clase para que se 'ilumine' por un momento, 
  *luego esa clase se debe quitar devolviendo el estado del color al inicial */
  iluminarColor(color){
    //*esta es una secuencia de colores, contiene los elementos html (div) segun su id color
    //*iluminar color ingresando la clase light
    this.colores[color].classList.add('light')
    //*luego de 350ms, llamar a apagar color
    setTimeout(() => this.apagarColor(color), 350)
  }

  //*apaga el color sacando la clase light
  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  //*Recorrer el array de colores hasta el nivel de juego
  iluminarSecuencia(){
    //*importante el uso de let y const para no sobreescribir el bloque
    let i
    for(i = 0; i < this.nivel; i++){
      //*por cada numero, transformar la secuencia a color y asignar 
      const color = this.transformarNumeroAColor(this.secuencia[i])
      //*iluminamos el color, cada repeticion del for, multiplicando al setTimeout() * i segundos, asi la secuencia se ilumina correctamente
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
    //*luego de cada secuencia, se lanza el turno del jugador
    setTimeout(this.turnoJugador, 1000 * i)
  }

  //*agregar evento a cada boton 'color' elegible en el juego
  agregarEventosClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }

  //*turno del jugador
  turnoJugador(){
    if(turno.contains(simon)){
      turno.removeChild(simon)
      turno.appendChild(jugador)
    }
  }

  //*quitar evento a cada boton 'color' elegible en el juego
  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }

  //*evento de cada boton 'color', esta atado (bind) al 'this' del juego  
  elegirColor(ev){
    //*dado el atributo data-'nombre' en html, en target.dataset existe un atributo 'color' con el color de cada boton
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    //*si numero de color elegido === secuencia de colores del nivel[indice subnivel]
    if (numeroColor === this.secuencia[this.subNivel]) {
      this.subNivel++
      //*si el subnivel se iguala al nivel en que esta el jugador, entonces paso de nivel
      if (this.subNivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        //*si el jugador llego al ultimo nivel, entonces gana el juego o inicia el siguiente nivel
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          //*inicia el siguiente nivel, luego de 2s
          setTimeout(this.siguienteNivel, 2000)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  //*gano el juego
  ganoElJuego(){
    swal('Simon Dice', 'Tu ganas ...esta vez!', 'success')
      .then(() => {
        this.inicializar()
      })
  }

  //*perdio el juego
  perdioElJuego(){
    swal('Simon Dice', 'Mejor suerte la próxima!', 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }
}
 
//*Completar nombre del jugador
function nombreJugador(){
  swal({
    text: 'Ingresa un nombre de Jugador',
    content: "input",
    /* 
      *En caso de elegit boton 'Listo!', tomara el nombre jugador
      *La opcion 'Sin Nombre' NO ejecuta nada
    */
    buttons: ["Sin Nombre", "Listo!"],
  })
  .then((nombre) => {
    if(nombre){
      NOMBRE_JUGADOR.push(nombre)
      jugador = document.createTextNode(NOMBRE_JUGADOR[0])
    }else{
      NOMBRE_JUGADOR.push('Player')
    }
  })
}

//*Llamar funcion, nombreJugador
nombreJugador()
 
//*Evento click, iniciar el juego
function empezarJuego(){
  let juego = new Juego()
}