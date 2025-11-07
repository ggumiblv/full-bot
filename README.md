# full-bot

Ссылка на фронтенд: https://full-bot-five.vercel.app/
Ссылка на бэкенд:

# Инициализация backend (node.js)

    1. Создать файл index.js.
    2. Инициализировать проект командой "npm init -y".
    3. Установка пакета nodemon, обеспечивает перезапуск бота при изменении кода - "npm i -D nodemon".
    4. Добавляем в package.json скрипт: "start": "nodemon index.js".
    5. Устанавливаем пакет https://www.npmjs.com/package/node-telegram-bot-api командой "npm i node-telegram-bot-api"

# Создание бота (BotFather)

    1. Ввести команду "/newbot", назвать бота, получить токен. Доступ к боту реализуется через этот токен, поэтому не должен быть доступен для посторонних.
    2.
