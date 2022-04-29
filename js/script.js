import    tabs  from './modules/tabs';
import   modal  from './modules/modal';
import   timer  from './modules/timer';
import   cards  from './modules/cards';
import    calc  from './modules/calc';
import   forms  from './modules/forms';
import  slider  from './modules/slider';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const showModalByTimerId = setTimeout(() => showModal('.modal', showModalByTimerId), 500000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal',showModalByTimerId);
    timer('.timer', '2022-04-30');
    cards();
    calc();
    forms('form', showModalByTimerId);
    slider({
        container : '.offer__slide',
        slide : '.offer__slider',
        nextArrow : '.offer__slider-next',
        prevArrow :  '.offer__slider-prev',
        totalCounter : '#total',
        currentCounter :  '#current',
        wrapper :  '.offer__slider-wrapper',
        field :   '.offer__slider-inner' 
    });
});