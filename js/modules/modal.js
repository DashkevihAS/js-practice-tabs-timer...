function showModal(modalSelector,showModalByTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // убираем прокрутку при всплытии модального окна
    
    console.log(showModalByTimerId);
    if (showModalByTimerId) {
        clearInterval(showModalByTimerId);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = ''; // восстанавливаем скролл после закрытия модального окна 
}

function modal(triggerSelector, modalSelector, showModalByTimerId ) {

    const modalTriggers = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    
    modalTriggers.forEach(btn => {
        btn.addEventListener('click', ()=> showModal(modalSelector,showModalByTimerId));
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

   


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector,showModalByTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

}

export default  modal;
export {showModal};
export {closeModal};