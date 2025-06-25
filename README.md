Вот готовый `README.md` файл, оформленный в markdown-формате:

---

````markdown
# 🤖 Minecraft HolyWorld Bot (Mineflayer)

Привет! Я начинающий кодер и хочу поделиться своим ботом для Minecraft-сервера **HolyWorld**, созданным с использованием библиотеки [mineflayer](https://github.com/PrismarineJS/mineflayer).

## 📌 Возможности бота

- 🔐 Капча автоматически сохраняется и отображается на локальном сервере:
  [http://localhost:4001/captcha](http://localhost:4001/captcha)
- 🕹️ Управление ботом осуществляется через:
  [http://localhost:4001/control](http://localhost:4001/control)
- 📦 Веб-инвентарь доступен на:
  - `http://localhost:3000` — для первого бота
  - `http://localhost:3001` — для второго бота
  - `http://localhost:3002` — для третьего, и так далее...

## ⏱️ Поддержка нескольких аккаунтов

Если вы укажете **несколько ников**, боты будут запускаться **по одному каждые 15 секунд**, чтобы избежать проблем с одновременным подключением.

## ⚙️ Установка зависимостей

Перед запуском убедитесь, что установлены все необходимые библиотеки. Выполните в терминале:

```bash
npm install body-parser canvas express flayercaptcha mineflayer mineflayer-pathfinder mineflayer-web-inventory pngjs
````

Либо создайте `package.json` вручную:

```json
{
  "dependencies": {
    "body-parser": "^2.2.0",
    "canvas": "^3.1.1",
    "express": "^5.1.0",
    "flayercaptcha": "^1.0.5",
    "mineflayer": "^4.29.0",
    "mineflayer-pathfinder": "^2.4.5",
    "mineflayer-web-inventory": "^1.8.5",
    "pngjs": "^7.0.0"
  }
}
```

## 🚀 Запуск бота

После установки всех зависимостей запустите бота следующей командой:

```bash
node имя_файла_с_ботом.js
```

## 📬 Связь

Если у вас возникли вопросы или предложения, напишите мне в Telegram:
[@Tembick](https://t.me/Tembick)

---

> Спасибо за интерес к моему проекту! Удачи в автоматизации 😄

```

---

Если хочешь, я могу помочь упаковать это в `README.md` файл автоматически или сгенерировать GitHub-репозиторий под это.
```
Вот английская версия `README.md`:

---

````markdown
# 🤖 Minecraft HolyWorld Bot (Mineflayer)

Hi! I'm a beginner coder, and I’d like to share my custom-made bot for the **Minecraft HolyWorld** server, built using **mineflayer**.

## 📦 Bot Features

- 📸 **Captcha images** are sent directly to your local host:  
  [http://localhost:4001/captcha](http://localhost:4001/captcha)

- 🎮 **Bot control panel** is available here:  
  [http://localhost:4001/control](http://localhost:4001/control)

- 💼 **Web inventory** is accessible on port `3000 + n`, where `n` is the bot’s index:  
  - Example:  
    - First bot: `http://localhost:3000`  
    - Second bot: `http://localhost:3001`  
    - etc.

- 🕒 If you input multiple nicknames, bots will launch with a **15-second delay** between each one to avoid conflicts or overloads.

---

## 🚀 How to Run

1. Install required dependencies. Run the following in your terminal:

   ```bash
   npm install
````

`package.json` dependencies:

```json
{
  "dependencies": {
    "body-parser": "^2.2.0",
    "canvas": "^3.1.1",
    "express": "^5.1.0",
    "flayercaptcha": "^1.0.5",
    "mineflayer": "^4.29.0",
    "mineflayer-pathfinder": "^2.4.5",
    "mineflayer-web-inventory": "^1.8.5",
    "pngjs": "^7.0.0"
  }
}
```

2. Launch the bot:

   ```bash
   node <your-bot-filename>.js
   ```

---

## 📬 Contact

For questions, feedback, or collaboration, feel free to message me on Telegram:
**[@Tembick](https://t.me/Tembick)**

```

---

If you'd like, I can combine both English and Russian into a bilingual README. Let me know!
```
