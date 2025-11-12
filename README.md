# full-bot

**Ссылка на фронтенд:** [https://full-bot-five.vercel.app/](https://full-bot-five.vercel.app/)  
**Ссылка на бэкенд:** [https://my-bot-backend-1.onrender.com/](https://my-bot-backend-1.onrender.com/)

---

## Используемые источники

1. [Документация Telegram Mini App](https://core.telegram.org/bots/webapps)
2. [Библиотека для работы с Telegram Bot API](https://www.npmjs.com/package/node-telegram-bot-api)
3. [Гайд по разработке Telegram Mini App (Selectel)](https://selectel.ru/blog/tutorials/telegram-bot-like-internet-shop/?utm_source=youtube.com&utm_medium=referral&utm_campaign=help_telegrambot_internet-shop_031022_ulbi-tv_paid)
4. [Статья по реализации авторизации в Telegram Mini App (Habr)](https://habr.com/ru/articles/889270/)

---

## Настройки бота (BotFather)

1. Ввести команду `/newbot`, назвать бота и получить токен. Токен не должен быть доступен посторонним.

2. Содержимым главной кнопки может быть либо ссылка на Telegram Mini App, либо список команд с описаниями.

   - Для установки ссылки: **my-bot → Bot Settings → Menu Button → вставить ссылку на web.**
   - Для установки команд: **my-bot → Edit Bot → Edit Commands → ввести команды без «/»**.

3. Существует 7 способов реализовать доступ к Telegram Mini App  
   (см. [официальную документацию](https://core.telegram.org/bots/webapps#implementing-mini-apps)):

   - **Profile button**
   - **Keyboard button** — отображается в клавиатуре под полем ввода; не получает данные о пользователе.  
     Используется для простых форм, календарей и т. д. Полученные данные отправляются обратно боту через  
     `Telegram.WebApp.sendData()` (пример в компоненте `Form`).
   - **Inline button** — отображается под сообщением бота, получает данные о пользователе, теме и уникальный  
     идентификатор сеанса `query_id`, который позволяет отправлять сообщения от имени пользователя с помощью  
     `answerWebAppQuery()` (пример в компоненте `ProductList`).
   - **Bot menu button**
   - **Inline mode** (не получает данные о пользователе)
   - **По прямой ссылке**
   - **Через attachment menu** — ссылка в браузере, которая перебрасывает в Telegram.

   Метод отправки сообщений ботом:  
   [https://core.telegram.org/bots/api#sendmessage](https://core.telegram.org/bots/api#sendmessage)

---

## Backend (node.js)

1. Создать файл index.js.

2. Инициализировать проект командой "npm init -y".

3. Установка пакета nodemon, обеспечивает перезапуск бота при изменении кода - "npm i -D nodemon".
4. Добавляем в package.json скрипт: "start": "nodemon index.js".

5. Устанавливаем пакет [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api).
   Способы получения обновлений от сервера: [polling](https://github.com/yagop/node-telegram-bot-api/blob/master/examples/polling.js), [webhook](https://github.com/yagop/node-telegram-bot-api/blob/master/examples/webhook/express.js)

6. Добавляем токен бота в переменные окружения.

7. Настраиваем базовый функционал бота.
   Основное взаимодействие с пользователем происходит через обработчик события 'message': bot.on('message', () => {}), внутри которого происходит обработка команд.

8. Получаем и обрабатываем post запрос [валидации](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app),
   возвращаем ответ.

---

## Frontend (react)

1.  Инициализировать проект командой "npm create vite@latest" (для версии node v18.20.8, нужно установить vite версии 5.4.20)

2.  В файл index.html в тег head добавляем скрипт: <script src="https://telegram.org/js/telegram-web-app.js?59"></script>.

    После подключения скрипта станет доступен объект [window.Telegram.WebApp](https://core.telegram.org/bots/webapps#initializing-mini-apps), содержащий initData, initDataUnsafe, информацию о теме, кнопки, слушатели событий, функции (close(), ready()) и др.

    Хорошей практикой является вызов метода ready(), который сообщает о том, что приложение полностю проинициализировалось и его можно отрисовывать.

    initData - нераспаршенная строка с данными о пользователе;  
    initDataUnsafe - преобразованный json объект с данными о пользователе, который удобно использовать.

3.  Если используется vite или любой другой статический хостинг, добавить в корне проекта versel.json с объектом { "rewrites": [{ "source": "/(.*)", "destination": "/" }]}

4.  Telegram рекомендует производить валидацию initData на бэкенде. (см. раздел Backend, пункт 8).
    Поэтому получая его через window.Telegram.WebApp.initData, отправляем post запрос с body: JSON.stringify({ initData }).
