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

    // Timer -----------------------------------------

    const dedline = '2022-04-10';

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
            // console.log(t);
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

            if (t.total <= 0) {
                clearInterval(interval);
                days.innerHTML = 0;
                hours.innerHTML = 0; 
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
            }
        }
    }
    setClock(dedline, '.timer');   

    // modal ----------------------------------------

    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
        
    
    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // убираем прокрутку при всплытии модального окна
        clearInterval(showModalByTimerId);
    }

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', showModal);
    });


    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = ''; // восстанавливаем скролл после закрытия модального окна 
    }

    

    
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const showModalByTimerId = setTimeout(showModal, 500000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

// Используем классы для карточек меню ======================================


    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27; /* курс конвертации  в гривны - может приходить с сервера */
            this.changeToUAH(); /* сразу записываем сконвертированый прайс */
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }
    // ---Можно запустить так:-----
    // const div = new MenuCard(аргументы);
    // div.render();
    

    /* так можно если вызываем один раз и больше с ним ничего не делаем : */
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu__field .container'
    ).render(); 

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        18,
        '.menu__field .container',
        'menu__item',
        'big'
    ).render(); 

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        15,
        '.menu__field .container'
    ).render();  

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! С вами скоро свяжется менеджер',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach((item)=> {
        postData(item); 
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto
            `;
            form.insertAdjacentElement('afterend',statusMessage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
            
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
}); 






