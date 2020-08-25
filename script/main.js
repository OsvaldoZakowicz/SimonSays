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
  constructor(){
    this.inicializar()
    this.generarSecuencia()
  }
  //inicio del juego
  inicializar(){
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
}

function empezarJuego(){
  let juego = new Juego();
}