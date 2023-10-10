startButton.addEventListener('click',startClock)
returnButton.addEventListener('click', function (){location.reload()})



function startClock () {
    const breakInput = Number(longBreakInput.value)
    console.log(breakInput)
    if(breakInput <= 30 && breakInput >= 15){
        globalInterval(globalClock)
        pomodoroInterval(pomodoroClock)
        divSetLongBreak.classList.add('desaparece')
        divClocks.classList.add('aparecer-container-return')
    }
}

//Class for Pomodor's lapses
const lapses = {
    break: 0,
    longBreak: 0
}
//Prototype Clock
class Clock {
    constructor({
        hour,
        minutes,
        seconds
    }){
        this.hour = hour;
        this.minutes = minutes,
        this.seconds = seconds
    }       
}


const pomodoroClock = new Clock ({
    hour: 0,
    minutes: 0,
    seconds: 0,
    }
)

const pomodoroInterval = (clock) => {
    const breakInput = Number(longBreakInput.value)
    let intervalClock = setInterval(() => {
    pPomodoroClock.textContent = (`${clock.hour}:${clock.minutes}:${clock.seconds}`)
    //Count LongBreak
    if(lapses.longBreak == 4){
        recessTime.classList.add('aparecer-container-return')
        if(clock.seconds > 58){
            clock.seconds = 0
            if(clock.minutes > breakInput - 2){
                clock.minutes = 0
                clock.seconds = 0
                lapses.break = 0
                lapses.longBreak = 0
            }else{clock.minutes++}
        }else{clock.seconds++}
    }else{
        //Count break
        if(lapses.break === 1){
            recessTime.classList.add('aparecer-container-return')
            if(clock.seconds > 58){
                clock.seconds = 0
                if(clock.minutes > 3){
                    clock.minutes = 0
                    clock.seconds = 0
                    lapses.break--
                }else{clock.minutes++}
            }else{clock.seconds++}
        }
        //Count until 25 min
        else{if(clock.seconds > 58){
            recessTime.classList.add('desaparece')
            clock.seconds = 0
            if(clock.minutes > 23){
                clock.minutes = 0
                clock.seconds = 0
                lapses.break++
                lapses.longBreak++
            } else{clock.minutes++}
        } else{clock.seconds++}}
    }
        console.log(`Pomodoro${clock.hour}:${clock.minutes}:${clock.seconds}`)}, 1000)
        stopButton.addEventListener('click', () => {
            clearInterval(intervalClock)

        })
}

const globalClock = new Clock ({
    hour: 0,
    minutes: 0,
    seconds: 0,
})

const globalInterval = (clock) => {
    let pomodoroInterval = setInterval(() => {
    pGlobalClock.textContent = (`${clock.hour}:${clock.minutes}:${clock.seconds}`)
    if(clock.seconds > 58){
        clock.seconds = 0
        if(clock.minutes > 58){
            clock.minutes = 0
            if(clock.hour > 22) {
                clock.hour = 0
            }else{clock.hour++}
        }
        else{clock.minutes++}
    }else{clock.seconds++}
    console.log(`${clock.hour}:${clock.minutes}:${clock.seconds}`)}, 1000)
    stopButton.addEventListener('click', () => {
        clearInterval(pomodoroInterval)
        blackBack.classList.add('aparecer-black')
        lastContainer.classList.add('aparecer-container-return')
        lastDialog.textContent = `Tu tiempo de estudio ha sido de ${clock.hour}:${clock.minutes}:${clock.seconds}`
    })
}



