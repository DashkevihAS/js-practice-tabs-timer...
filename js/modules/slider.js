import {setZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //   slider
    const slides = document.querySelectorAll(container);
    const slider = document.querySelector(slide);
    const current = document.querySelector(currentCounter);
    const total = document.querySelector(totalCounter);
    const next = document.querySelector(nextArrow);
    const prev = document.querySelector(prevArrow);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
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
}

export default slider;