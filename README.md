# full-bot

Ссылка на фронтенд: https://full-bot-five.vercel.app/.
Ссылка на бэкенд: https://my-bot-backend-1.onrender.com/.

# Настройки бота (BotFather)

    1. Ввести команду "/newbot", назвать бота, получить токен. Доступ к боту реализуется через этот токен, поэтому не должен быть доступен  для посторонних.
    2. Содержимым главной кнопки можнет быть либо ссылка на Telegram mini app, либо список команд с описаниями.
        Для установки ссылки - my-bot / Bot Settings / Menu Button -> вставить ссылку на web.
        Для установки команд - my-bot / Edit Bot / Edit commands -> ввести команды без "/"

# backend (node.js)

    1. Создать файл index.js.
    2. Инициализировать проект командой "npm init -y".
    3. Установка пакета nodemon, обеспечивает перезапуск бота при изменении кода - "npm i -D nodemon".
    4. Добавляем в package.json скрипт: "start": "nodemon index.js". (для локального запуска)
    5. Устанавливаем пакет https://www.npmjs.com/package/node-telegram-bot-api командой "npm i node-telegram-bot-api"
    6. Добавляем токен бота в переменные окружения.
    7. Настраиваем базовый функционал бота.
    8. Получаем и обрабатываем post запрос валидации(https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app), возвращаем ответ.

# frontend (react)

    1.  Инициализировать проект командой "npm create vite@latest" (для версии node v18.20.8, нужно установить vite версии 5.4.20)
    2.  В файл index.html в <head></head> добавляем скрипт: <script src="https://telegram.org/js/telegram-web-app.js?59"></script>.
     После подключения скрипта станет доступен объект window.Telegram.WebApp (https://core.telegram.org/bots/webapps#initializing-mini-apps), содержащий initData (данные о пользователе, который открыл это приложение), initDataUnsafe, цвета (например, var(--tg-theme-bg-color), var(--tg-theme-text-color)), кнопки, слушатели событий и др.
    3. Если используется vite или любой другой статический хостинг, добавить в корне проекта versel.json с объектом  { "rewrites": [{ "source": "/(.*)", "destination": "/" }]}
    4. Telegram рекомендует производить валидацию initData на бэкенде. https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app Поэтому получая его через window.Telegram.WebApp.initData, отправляем post запрос с body: JSON.stringify({ initData }).
