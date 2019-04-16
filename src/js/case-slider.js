'use strict';

(function () {
    var slider = document.querySelector('.slider');

    var sliderLine = slider.querySelector('.slider__cards');
    var cards = slider.querySelectorAll('.card');

    var sliderImage = slider.querySelector('.slider__image');

    var pagination =  slider.querySelector('.pagination');
    var progressBar = pagination.querySelector('.pagination__dots');

    var ul = progressBar.querySelector('.dots');
    
    var currentCard = pagination.querySelector('.current');
    var totalCards = pagination.querySelector('.total');
    var prevButton = pagination.querySelector('.pagination__button--prev');
    var nextButton = pagination.querySelector('.pagination__button--next');

    var current = 1;
    var total = cards.length;

    var SLIDER_OFFSET = 580;


    /** Устанавливает класс только у активного элемента
     * 
     * @param {Node}    list    - списко точек
     * @param {Int}     i       - индекс элемента
     * 
     */
    var setActiveDot = function (list, i) {
        [].map.call(list.children, li => li.classList.remove('dots__item--active'));
        list.children[i].classList.add('dots__item--active');
        current = i + 1;
    }

    /** Вешаем на элементы списка обработчик событий (через замыкание)
     * 
     * @param {Node}    li      - элемент списка
     * @param {Int}     index   - индекс активного элемента (гуманитарный, не программистский)
     * 
     */
    var listItemClickHandler = function (li, index) {
        li.addEventListener('click', function () {
            moveSlide(index + 1, total);
            setActiveDot(ul, index);
        });
    }

    /** Создаём элемент списка
     * @return {Node} li
     */
    var createListElment = function () {
        var li = document.createElement('li');
        li.classList.add('dots__item');
        return li;
    }

    /** Формируем список с точками
     * 
     * @param {Int} total - количество карточек слайдов
     * @return {Node} ul
     * 
     */
    var createListWithDots = function (total) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < total; i++) {
            fragment.appendChild(createListElment(i)); // для уменьшений опеаций на DOM
        }

        ul.appendChild(fragment);
        [].map.call(ul.children, (elem, index) => listItemClickHandler(elem, index)); // Проходимся по всему списку
        
        return ul;
    }


    /** Если в чиле меньше двух цифр, то добавляем ведущий ноль.
     * 
     * @param   {Int}       value - значение, которое нужно преодразовать в правильное текстовое представление
     * @return  {String}    правильное текстовое представление
     * 
     */
    var setCorrectPaginationValue = function (value) {
        var sValue;
        var valueLength = value.toString().length;

        if (valueLength == 1) {
            sValue = '0' + value;
        } else {
            sValue = value.toString();
        }

        return sValue;
    }

    /** Передвигаем слайд
     * 
     * @param {Int} slideNumber - порядковый номер слайда (гуманитарный, не программистский)
     * @param {Int} slideTotal  - общее количество слайдов
     * 
     */
    var moveSlide = function (slideNumber, slideTotal) {
        var indexElement = slideNumber - 1; // порядковый номер слайда (программистский, не гуманитарный)
        var cardImageSrc = cards[indexElement].querySelector('.card__image').src;
        var translateX = 'translateX(' + ((0 - SLIDER_OFFSET) * indexElement) + 'px)';

        if (slideNumber <= slideTotal && slideNumber >= 0) {
            sliderLine.style.transform = translateX;
        };
        
        currentCard.textContent = setCorrectPaginationValue(slideNumber); // Прописываем номер текущего слайда
        sliderImage.style.backgroundImage = 'url(' + cardImageSrc + ')'; // Меняем фон на банере
    }

    /** */
    prevButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        current > 1 ? current = current - 1 : null;
        moveSlide(current, total);
        setActiveDot(ul, current - 1);
    });
    
    /** */
    nextButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        current < total ? current = current + 1 : null;
        moveSlide(current, total);
        setActiveDot(ul, current - 1);
    });

    /* Установка значений по умолчанию */
    currentCard.textContent = setCorrectPaginationValue(current);
    totalCards.textContent = setCorrectPaginationValue(total);
    progressBar.appendChild(createListWithDots(total - 1)); // Первый элемент уже есть в разметке
    
})();