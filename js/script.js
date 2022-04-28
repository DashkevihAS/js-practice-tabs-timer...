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

    async function getResource(url) {
        let res = await fetch(url);

        if (!res.OK && res.status != 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();

    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });


    // getResource('http://localhost:3000/menu')
    // .then(data => cteateCard(data));

    // function cteateCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // ---Можно запустить так:-----
    // const div = new MenuCard(аргументы);
    // div.render();
    

    /* так можно если вызываем один раз и больше с ним ничего не делаем : */
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu__field .container'
    // ).render(); 

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     18,
    //     '.menu__field .container',
    //     'menu__item',
    //     'big'
    // ).render(); 

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     15,
    //     '.menu__field .container'
    // ).render();  

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! С вами скоро свяжется менеджер',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach((item)=> {
        bindPostData(item); 
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
                headers: {
                    'Content-type' : 'application/json'
                },
                body: data
        });

        return await res.json();

    };

    function bindPostData(form) {
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
            // formData сначала в массив массивов, потом в объект и потом в JSON формат:
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
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

    fetch('http://localhost:3000/menu')
    .then(data =>data.json());

//   slider

    const slides = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');
    const next = document.querySelector('.offer__slider-next');
    const prev = document.querySelector('.offer__slider-prev');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset =0;


    total.textContent = setZero(slides.length);
    current.textContent = setZero(slideIndex);

    slidesField.style.width = 100 * slides.length +'%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach( slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
    const dots = [];
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i=0; i<slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to',i+1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        indicators.append(dot);
        if (i===0) {
            dot.style.opacity = '1';
        }
        dots[i] = dot;
    }

    function chooseDot(dots) {
        dots.forEach( dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex-1].style.opacity = '1';
    }

    function deleteNoDigit(str) {
        return +str.replace(/\D/ig,'');
    }

    dots.forEach( (dot) => {
        dot.addEventListener ('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            chooseDot(dots);

            offset = deleteNoDigit(width) * (slideTo -1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            current.textContent = setZero(slideTo);

        });
    });


    

    next.addEventListener('click', () => {
        if (offset == deleteNoDigit(width) * (slides.length -1)) {
            offset =0;
            current.textContent = setZero(1);
            slideIndex = 1;
        } else {
            offset += deleteNoDigit(width);
            current.textContent = setZero(++slideIndex);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        chooseDot(dots);

        }); 


    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNoDigit(width) * (slides.length -1);
            current.textContent = setZero(slides.length);
            slideIndex = slides.length;
        } else {
            offset -= deleteNoDigit(width);
            current.textContent = setZero(--slideIndex);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        chooseDot(dots);

        }); 
    


    //---------первый вариант --------------------
    // showSlides(slideIndex);
    // total.textContent = setZero(slides.length);

    // function showSlides(n) {
    //     if (n >slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n<1) {
    //         slideIndex = slides.length;
    //     }
    
    //     slides.forEach(slide => slide.classList.add('hide'));
                
    //     slides[slideIndex -1].classList.remove('hide');
    //     current.textContent = setZero(slideIndex);
        
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // }); 
    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // }); 
//--------------------------------------------------------------//

//calc  

const result = document.querySelector('.calculating__result span');

let sex = 'female',
    height, weight, age,
    ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activSelector) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach( element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }

                elements.forEach( element => {
                    element.classList.remove(activSelector);
                }); 

                e.target.classList.add(activSelector);   
            
                calcTotal();
            });
        });
    }


    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input',() => {
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;   
            }
            calcTotal();
        });
        
        
    }

    getDinamicInformation('#height');
    getDinamicInformation("#weight");
    getDinamicInformation("#age");
    
   
});






