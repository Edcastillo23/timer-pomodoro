window.onload = () => {
    /*Timer*/
    let workTime;
    let breakTime;
    let restTime;
    let timesCompleted;
    let cyclesGoal; // un ciclo de trabajo y descanso
    let cyclesCompleted = 0; // objetivo de pomodoros propuesto

    function pomodoroController() {
      if (isRestTime()) {
        cyclesCompleted++;
        if (!goalReached()) {
          currentTime = restTime;
          timer();
          timesCompleted = 0;
        } else {
          console.log('Pomodoro Finalizado');
        }
        return;
      }

      if (timesCompleted % 2 == 0) {
        // Tiempo de concentracion
        currentTime = workTime;
        timesCompleted++; // Tiempo de concentracion
        timer();
        console.log(
          "Tiempo de concentración " + timesCompleted + ", ciclos " + cyclesCompleted
        );
      } else {
        /* Tiempo de descanso */
        currentTime = breakTime;
        timesCompleted++;
        timer();
        console.log(
          "Tiempo de decanso corto " + timesCompleted + ", ciclos " + cyclesCompleted
        );
      }
    }

    function goalReached() {
      return cyclesGoal == cyclesCompleted;
    }

    // descanso largo
    function isRestTime() {
      return timesCompleted == 7;
    }

    /*Temporizador*/
    let currentTime; /* Minutos seteados */ 
    let seconds = 0;

    function timer() {
      if (currentTime > 0 || seconds > 0) {
        if (seconds == 0) {
            seconds = 59;
            currentTime--;
        } else {
            seconds--;
        }
        updateClock();
        console.log (currentTime, seconds);
        setTimeout(timer, 1000);
      }  else {
        pomodoroController();
        console.log("El temporizador terminó");
      }
    }

// Frontend Connection
    let cyclesInput = document.getElementById("ciclos");
    let clock = document.getElementById("reloj");
    let startButton = document.getElementById("inicio");
    let workTimeInput = document.getElementById("concentracion");
    let breakTimeInput = document.getElementById("descansoCorto");
    let restTimeInput = document.getElementById("descansoLargo");

// Funcionalidad del boton
      startButton.onclick = () => {
       populatedVariables();
      startPomodoro();
    };

function startPomodoro() {
  console.log('Pomodoro iniciado 💪');
  pomodoroController();
}

function populatedVariables() {
  console.log('Variables populadas');
  workTime = workTimeInput.value; // Toma el valor que haya puesto el usuario
  breakTime = breakTimeInput.value; // Toma el valor que haya puesto el usuario
  restTime = restTimeInput.value; // Toma el valor que haya puesto el usuario
  cyclesGoal = cyclesInput.value; // Toma el valor que haya puesto el usuario
  timesCompleted = 0;
}

// El reloj
let clockMinutes;
let clockSeconds;

function updateClock() {
  clockMinutes = formatNumbers(currentTime);
  clockSeconds = formatNumbers(seconds);
  clock.innerHTML = clockMinutes + ':' + clockSeconds;
}

function formatNumbers(time) {
  let formatteDigits;
  if (time < 10) {
    formatteDigits = '0' + time;
  } else {
    formatteDigits = time;
  }
  return formatteDigits;
}
};
