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
  }
  inicializar(){
    btnEmpezar.classList.add('hide') //clase .hide en css main
  }
}

function empezarJuego(){
  let juego = new Juego();
}