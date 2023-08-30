const longBreakInput = document.querySelector('.break-minutes')
const startButton = document.querySelector('.start-button')
const divSetLongBreak = document.querySelector('.set-long-break')
const divClocks = document.querySelector('.cont-clock')
const pGlobalClock = document.querySelector('.global-clock')
const pPomodoroClock = document.querySelector('.pomodoro-clock')
const stopSoundButton = document.querySelector('.recess-time')

startButton.addEventListener('click',startClock)


function startClock () {
    const breakInput = Number(longBreakInput.value)
    console.log(breakInput)
    if(breakInput <= 30 && breakInput >= 15){
        divSetLongBreak.classList.toggle('inactive')
        divClocks.classList.toggle('inactive')
        globalInterval(globalClock)
        pomodoroInterval(pomodoroClock)
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
    setInterval(() => {
    pPomodoroClock.textContent = (`${clock.hour}:${clock.minutes}:${clock.seconds}`)
    //Count LongBreak
    if(lapses.longBreak == 4){
        stopSoundButton.classList.remove('inactive')
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
            stopSoundButton.classList.remove('inactive')
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
            stopSoundButton.classList.add('inactive')
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
}

const globalClock = new Clock ({
    hour: 0,
    minutes: 0,
    seconds: 0,
})

const globalInterval = (clock) => {setInterval(() => {
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
}



