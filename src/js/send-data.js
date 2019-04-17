'use strict';

(function () {
    var sendData = function (formData, callback) {

        var url = './api/api.php';

        fetch(url, {
            body: formData,
            method: 'post'
        })
        .then(response => response.text())
        .then(response => callback(response))
        .catch(e => console.log(e))
    }

    window.sendData = sendData;
})();