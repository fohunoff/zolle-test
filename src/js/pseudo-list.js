'use strict';

(function () {
    
    var form = document.forms['form'];
    var inputsWithSelect = form.querySelectorAll('.pseudo-select');
    
    var pseudoList = document.querySelector('.pseudo-select__list');

    /** Строит один элемент списка
     * 
     * @param   {String}    textContent - значение поля в выпадающем списке
     * @param   {Node}      inputNode   - поле, к которому принадлежит выпадающий список
     * @return  {Node}      listItem    - настроенный элемент списка
     * 
     */
    var createListItem = function (textContent, inputNode) {
        var listItem = document.createElement('li');
        listItem.classList.add('pseudo-select__item');
        listItem.textContent = textContent;

        // Прописываем VALUE в INPUT
        listItem.addEventListener('click', function () {
            inputNode.value = listItem.textContent;
            pseudoList.classList.remove('pseudo-select__list--show');
        });

        return listItem;
    }

    /** Создаём выпадающий список
     * 
     * @param {Node} inputNode - input, к которому принадлежит список
     * 
     */
    var createDropList = function (inputNode) {
        var inputName = inputNode.name;
        
        if (!pseudoList.classList.contains('pseudo-select__list--show')) {
            pseudoList.textContent = ''; // Удаляем предыдущий список

            var data = window.MOCK_DATA[inputName];
            var fragment = document.createDocumentFragment();

            data.map(value => fragment.appendChild(createListItem(value.toString(), inputNode)))
            pseudoList.appendChild(fragment);
        }
    }
    
    /** На каждое поле, в котором есть иконка выпадающего списка, вешаем событие клика на эту иконку
     * 
     * @param {Event} evt - событие клика
     * 
     */
    var inputClickHandler = function (evt) {
        evt.preventDefault();
        
        var parent = evt.target.parentNode;
        var input = parent.querySelector('.input');

        createDropList(input);
        pseudoList.classList.toggle('pseudo-select__list--show');
    };

    [].map.call(inputsWithSelect, input => input.addEventListener('click', inputClickHandler));

})();
