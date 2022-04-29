function setZero(num) {
    if (num > 0 && num <= 10) {
        return `0${num}`;
    } 
    return num;
}


function timer(id, dedline) {

    function getTimeRemaning(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000*60*60*24)),
            hours = Math.floor((t / (1000*60*60))%24),
            minutes = Math.floor((t / (1000*60))%60),
            seconds = Math.floor((t / 1000)%60);
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function setClock(selector,endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            interval = setInterval(updateClock,1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaning(endTime);

            days.innerHTML = setZero(t.days);
            hours.innerHTML = setZero(t.hours); 
            minutes.innerHTML = setZero(t.minutes);
            seconds.innerHTML = setZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(interval);
                days.innerHTML = 0;
                hours.innerHTML = 0; 
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
            }
        }
    }
    setClock(id, dedline);   
}

export default  timer;
export {setZero};