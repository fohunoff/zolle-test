<?php

// Все данные должны храниться, конечно же, не здесь
// Этот скрипт, просто простая демонстрация

$login;
$password;
$phones = 89110800284;
$message = 'Новая заявка с сайта Zolle - id:' . time() . '. Проверьте эл.почту.';

function sendSMS () {
    $params = [
        'login'     => $login,
        'psw'       => $password,
        'phones'    => $phones,
        'mes'       => $message
    ];

    file_get_contents('https://smsc.ru/sys/send.php?' . http_build_query($params));
}

function sendEMAIL ($body) {

    // Эта функция просто как пример
    // Чаще всего использую PHPMailer
    $mail_to = '4f-foxy@mail.ru';
    $mail_title = 'Заявка с сайта Zolle';
    
    mail($mail_to, $mail_title, $body);
}


if ($_SERVER['REQUEST_METHOD'] && $_POST['is_isset_somethihg']) {

    $data = json_encode($_POST, JSON_UNESCAPED_UNICODE);
    
    sendSMS($data);
    sendEMAIL($data);
    
    // Нужны условия или обработка ошибок/успеха выполнения каждоый из вышеуказанных функций

    print(1);
}

?>