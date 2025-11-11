# full-bot

Ссылка на фронтенд: https://full-bot-five.vercel.app/.
Ссылка на бэкенд: https://my-bot-backend-1.onrender.com/.

# Настройки бота (BotFather)

    1. Ввести команду "/newbot", назвать бота, получить токен. Доступ к боту реализуется через этот токен, поэтому он не должен быть
        доступен  для посторонних.

    2. Содержимым главной кнопки можнет быть либо ссылка на Telegram mini app, либо список команд с описаниями.
        Для установки ссылки - my-bot / Bot Settings / Menu Button -> вставить ссылку на web.
        Для установки команд - my-bot / Edit Bot / Edit commands -> ввести команды без "/"

    3. Существует 7 способов реализовать доступ к Telegram Mini App (https://core.telegram.org/bots/webapps#implementing-mini-apps):
        - profile button;
        - keyboard button - отображается в клавиатуре под полем ввода, не получает данные о пользователе, используется для простых форм,
            календарей и др, полученную информацию отправляет обратно боту в виде строки, вызывая метод Telegram.WebApp.sendData (пример в этом коде в компоненте form)
        - inline button - отображается под сообщением бота, получает данные о пользователе, о теме, а так же уникальный идентификатор сеанса
            query_id, который позволяет отправлять сообщения от имени пользователя боту, используя метод answerWebAppQuery (пример в этом коде в компоненте ProductList)
        - bot menu button;
        - inline mode (не получает данные о пользователе);
        - по прямой ссылке;
        - через attachment menu(ссылка в браузере, которая перебрасывает в телеграм).

        https://core.telegram.org/bots/api#sendmessage - метод через который бот отправляет сообщения

# backend (node.js)

    1. Создать файл index.js.

    2. Инициализировать проект командой "npm init -y".

    3. Установка пакета nodemon, обеспечивает перезапуск бота при изменении кода - "npm i -D nodemon".
    4. Добавляем в package.json скрипт: "start": "nodemon index.js".

    5. Устанавливаем пакет https://www.npmjs.com/package/node-telegram-bot-api командой "npm i node-telegram-bot-api"
        Способы получения обновлений от сервера: polling(https://github.com/yagop/node-telegram-bot-api/blob/master/examples/polling.js), webhook(https://github.com/yagop/node-telegram-bot-api/blob/master/examples/webhook/express.js)

    6. Добавляем токен бота в переменные окружения.

    7. Настраиваем базовый функционал бота.
        Основное взаимодействие с пользователем происходит через обработчик события 'message': bot.on('message', () => {}), внутри которого происходит обработка команд.

    8. Получаем и обрабатываем post запрос валидации(https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app),
        возвращаем ответ.

# frontend (react)

    1.  Инициализировать проект командой "npm create vite@latest" (для версии node v18.20.8, нужно установить vite версии 5.4.20)

    2.  В файл index.html в <head></head> добавляем скрипт: <script src="https://telegram.org/js/telegram-web-app.js?59"></script>.
        После подключения скрипта станет доступен объект window.Telegram.WebApp (https://core.telegram.org/bots/webapps#initializing-mini-apps), содержащий initData (данные о пользователе, который открыл это приложение), initDataUnsafe, цвета (например, var(--tg-theme-bg-color), var(--tg-theme-text-color)), кнопки, слушатели событий, функции (close(), ready()) и др.
        Хорошей практикой является вызов метода ready(), который сообщает о том, что приложение полностю проинициализировалось и его можно отрисовывать.
        initData - нераспаршенная строка с данными о пользователе;
        initDataUnsafe - преобразованный json объект, который удобно использовать.

    3. Если используется vite или любой другой статический хостинг, добавить в корне проекта versel.json с объектом  { "rewrites": [{ "source": "/(.*)", "destination": "/" }]}

    4. Telegram рекомендует производить валидацию initData на бэкенде. https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
        Поэтому получая его через window.Telegram.WebApp.initData, отправляем post запрос с body: JSON.stringify({ initData }).
