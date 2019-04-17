'use strict';

(function () {
    var orderBlock = document.querySelector('.order__block');
    
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
    
    /** Создание и вставка блока после ответа от сервера
     * 
     * @param {Node} parentNode - блок, куда будет вставляться сообщение после отправки формы
     * 
     */
    var createSuccessMessage = function (parentNode) {
        parentNode.textContent = '';
        
        var div = document.createElement('div');
        var title = document.createElement('h1');
        var info = document.createElement('p');
        var buy = document.createElement('p');
        
        div.classList.add('form__success');
        
        title.textContent = 'Приступаем к работе';
        info.textContent = 'Предоставим 3 отличных варианта уже через 15 минут.';
        buy.textContent = 'Ожидайте нашего звонка!';
        
        div.appendChild(title);
        div.appendChild(info);
        div.appendChild(buy);
        
        parentNode.appendChild(div);
    }

     /** Создание и вставка блока после ответа от сервера (ошибка)
     * 
     * @param {Node} parentNode - блок, куда будет вставляться сообщение после отправки формы
     * 
     */
    var createErrorMessage = function (parentNode) {
        parentNode.textContent = '';
        
        var div = document.createElement('div');
        var title = document.createElement('h1');
        var info = document.createElement('p');
        
        div.classList.add('form__success');
        title.textContent = 'Что-то пошло не так...';
        info.textContent = 'Попробуйте позвонить нам на прямую: +7 (900) 000-00-00';
        
        div.appendChild(title);        
        div.appendChild(info);        
        parentNode.appendChild(div);
    }

    /** Дожидаемся ответа от сервера
     * 
     * @param {Node} parentNode - заглушка со спинером
     * 
     */
    var loading = function (parentNode) {
        parentNode.textContent = '';
        
        var div = document.createElement('div');   
        div.classList.add('form__success', 'loading');
        parentNode.appendChild(div);
    }
    
    /** Обработчик успешного ответа от сервера
    * 
    * @param {String} response - ответ от сервера
    * 
    */
    var succesHandler = function(response) {
        if (response === '1') {
            console.log('succes');
            createSuccessMessage(orderBlock);            
        } else {
            console.log('error');
            createErrorMessage(orderBlock);
        }
    }
    
    // Показ следующего поля формы
    button.addEventListener('click', function (evt) {
        evt.preventDefault();
        
        if (current == 4) {
            if (confirm('Подтвердите отправку данных')) {
                loading(orderBlock);
                
                var formData = new FormData(form);
                formData.append('is_isset_somethihg', 1);
                window.sendData(formData, succesHandler);
            }
        }
        
        current < total ? current++ : null;
        moveSlide(current);
    });
    
    // Показ предыдущего поля формы
    backButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        current > 1 ? current-- : null;
        moveSlide(current);
    })
})();