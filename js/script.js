window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabParent = document.querySelector('.tabheader__items'),
            tabContent = document.querySelectorAll('.tabcontent'),
            tabs = document.querySelectorAll('.tabheader__item');

    function hideContent() {
        tabContent.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
        });  

        tabs.forEach (item => {
            item.classList.remove('tabheader__item_active');
        });     
    }

    function showContent(i=0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show');
        
        tabs[i].classList.add('tabheader__item_active');
    } 
    
    hideContent();    
    showContent();
    
    tabParent.addEventListener('click', (event)=> {
        const target = event.target;
            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach ((tab, i) => {
                    if (target == tab) {
                        hideContent();    
                        showContent(i);
                    }
                });
            }
        
        
    });

    // Timer 

    const dedline = '2022-04-06';

    function setZero(num) {
        if (num > 0 && num <= 10) {
            return `0${num}`;
        } 
        return num;
    }

    function getTimeRemaning(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000*60*60*24)),
            hours = Math.floor((t / (1000*60*60))%24),
            minutes = Math.floor((t / (1000*60))%60),
            seconds = Math.floor((t / 1000)%60);
            console.log(t);
        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function setClock(endTime, selector) {
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

            if (t.total <=0) {
                clearInterval(interval);
            }
        }
    }
    setClock(dedline, '.timer');   

});