Тестовое задание для Питерской кампании Zolle
=============================================

Рабочая версия: https://fohunoff.ru/portfolio/zolle/

Для локального просмотра следует выполнить:
- `npm i`
- `npm start`

Так как в условиях тестового не были обозначены технологии, которые нужно (можно) использовать при разработке, я принял решение написать всё на чистом js и на достаточно чистом scss (для удобства читаемости, не делал большие вложенности).

Кстати, огранизация файлов в директории sass выбрана таким образом (по блокам) потому, как в тестовом нет повторяющихся элементов, которые можно было бы выделить в отдельную структуру, по моему субъективному мнению.

Также есть спорные моменты по дизайну, но на них я также не стал тратить время.
К примеру, не совсем понятно, что должна делать кнопка "закрыть" в блоке, который появляется после успешной отправки формы. Поэтому, я его просто не добавил в разметку, чтобы не сбивать с толку пользователя.

**Слайдер**

В слайдере использован такой подход смены слайдов ("двигаем" css-анимацией через свойство translate), как один из возможных.
Так как это тестовое, то не стал тут делать слишком навороченный слайдер. По этой же причине он не "круговой".
Выбор слайдов по "точкам" -- активен.
Переключение слайдов -- активно.

Также код слайдера предполагает, что количество слайдом может быть любым (чтобы легче было масштабировать или получать данные по JSON, к примеру).
Но минимально -- один слайдер.

**Форма**

Тут также использован чистый js. Сделал я это намерено, так как использование для такого небольшого проекта бибилотек или фреймворком -- расточительство ресурсов (по моему личному мнению). И по причине того, что это тестовое, на полях формы нет никакой проверки валидности.

Также, я немного доработал форму:
- добавил кнопку "назад", чтобы можно было вернуться к предыдущему полю формы.
- добавил шкале прогресса заполнения фон, чтобы было наглядно видно, сколько шагов осталось
- в конце текст кнопки изменил на "Отправить"


**Адаптивность**

Тут нет "резиновой" адаптивности из-за достаточно сложного дизайна. Поэтому в качестве брейкпоинтов, по которым перекраивается вёрстка выбраны стандартные: десктоп, планшет, мобильный.

**Отправка данных**

Отправка данных идёт через php-файл. Поэтому при локальном запуске нужно запустить локальный сервер и файле `send-data.js` правильно прописать путь (добавить `build` в путь). Тут в репрозитории прописан путь, который будет работать на сервере.

СМС и email отправки написаны схематично и не выполняют функцию до конца.
