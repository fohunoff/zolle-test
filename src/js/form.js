'use strict';

(function () {
    var form = document.forms['form'];
    var button = form.querySelector('.form__button');
    var backButton = form.querySelector('.button-goback');
    
    var formProgress = form.querySelector('.form__progress p');
    var progressBar = form.querySelector('.form__progress-bar');
    
    var sliderLine = form.querySelector('.form__slider');
    var formItemns = form.querySelectorAll('.form__item');
    var pseudoList = document.querySelector('.pseudo-select__list');
    
    var current = 1;
    var total = formItemns.length;
    
    var PROGRESS_SECTION_WIDTH = 100;
    var SLIDER_OFFSET = 740;
    
    button.textContent = 'Далее';
    
    /** Передвигаем слайд
    * 
    * @param {Int} slideNumber - порядковый номер слайда (гуманитарный, не программистский)
    * @param {Int} slideTotal  - общее количество слайдов
    * 
    */
    var moveSlide = function (slideNumber) {
        var indexElement = slideNumber - 1; // порядковый номер слайда (программистский, не гуманитарный)
        var translateX = 'translateX(' + ((0 - SLIDER_OFFSET) * indexElement) + 'px)';
        
        sliderLine.style.transform = translateX;
        
        formProgress.textContent = current + ' из 4'; // Прописываем номер текущего слайда формы
        progressBar.style.width = PROGRESS_SECTION_WIDTH * current + 'px';
        pseudoList.classList.remove('pseudo-select__list--show'); // Скрываем выпадающий список

        if (current == 4) {
            button.textContent = 'Отправить';

        } else {
            button.textContent = 'Далее';
        }
        
    }
    
    // Показ следующего поля формы
    button.addEventListener('click', function (evt) {
        evt.preventDefault();

        if (current == 4) {
            if (confirm('Подтвердите отправку данных')) {
                console.log('Отправка формы');
                console.log('Рисуем успешную отправку');
            }
        }

        current < total ? current++ : null;
        moveSlide(current);
    });
    
    backButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        current > 1 ? current-- : null;
        moveSlide(current);
    })
})();