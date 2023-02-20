window.onload = () => {
    // Pomodoro
    let tiempoDeConcentracion;
    let descansoCorto;
    let cicloCompletado; // un ciclo de trabajo y descanso
    // variables usadas en descanso largo
    let ciclosDePomodoro;
    let ciclosCompletados = 0; // descanso largo

    function controladorDePomodoro() {
      if (momentoDeDescansar) {
        ciclosCompletados++;
        if (!cumpleObjetivo()) {
          cicloCompletado = descansoCorto;
          temporizador();
          tiempoDeConcentracion = 0;
        } else {
          console.log('Pomodoro Finalizado');
        }
        return;
      }

      if (cicloCompletado % 2 == 0) {
        // Tiempo de concentracion
        minutosMostrados = tiempoDeConcentracion;
        cicloCompletado++; // Tiempo de concentracion
        temporizador();
        console.log(
          "Tiempo de concentración " + tiempoDeConcentracion
        );
      } else {
        /* Tiempo de descanso */
        minutosMostrados = descansoCorto;
        cicloCompletado++;
        temporizador();
        console.log(
          "Tiempo de decanso corto " + cicloCompletado
        );
      }
    }

    // descanso largo
    function descasoLargo() {
      return ciclosCompletados == 7;
    }

    /*Temporizador*/
    let minutosMostrados; /* Minutos seteados */ 
    let segundos;

    function temporizador() {
      if (minutosMostrados > 0 || segundos > 0) {
        if (segundos == 0) {
            segundos = 59;
            minutosMostrados--;
        } else {
            segundos--;
        }
        actualizarReloj();
        console.log (minutosMostrados, segundos);
        setTimeout(temporizador, 1000);
      }  else {
        controladorDePomodoro();
       // console.log("El temporizador terminó");
      }
    }
};
// Fronted Contection
let reloj = document.getElementById("clock");
let ciclos = document.getElementById("ciclos");
let botonInicio = document.getElementById("inicio");
let concentracion = document.getElementById("concentracion");
let descansoCortoElegido = document.getElementById("descansoCorto");
let descansoLargoElegido = document.getElementByid("descansoLargo");

// Funcionalidad del boton
botonInicio.onclick = () => {
  variablesPopuladas();
  iniciarPomodoro();
};
function iniciarPomodoro() {
  console.log('Pomodoro iniciado 💪');
  controladorDePomodoro();
}

function variablesPopuladas() {
  console.log('Variables populadas');
  tiempoDeConcentracion = concentracion.value; // Toma el valor que haya puesto el usuario
  descansoCorto = descansoCortoElegido.value; // Toma el valor que haya puesto el usuario
  descasoLargo = descansoLargoElegido.value; // Toma el valor que haya puesto el usuario
  ciclosDePomodoro = ciclos.value; // Toma el valor que haya puesto el usuario
  ciclosCompletados = 0;
}

// El reloj
let minutosDelReloj;
let segundosDelReloj;

function actualizarReloj() {
  minutosDelReloj = formatoDelNumero(minutosMostrados);
  segundosDelReloj = formatoDelNumero(segundos);
  minseg.innerHTML = minutosDelReloj + ': ' + segundosDelReloj;
}

function formatoDelNumero(time) {
  let formatoDelDigito;
  if (tiempo < 10) {
    formatoDelDigito = '0' + time;
  } else {
    formatoDelDigito = time;
  }
  return formatoDelDigito;
}

