# mineflayer_capcha_bot

Вот два текста, как ты просил:

---

### 🇷🇺 Русский текст:

Привет! Я начинающий кодер, и хочу поделиться своим созданным ботом для Minecraft-сервера **HolyWorld**, написанным на основе библиотеки **mineflayer**.

🔹 Немного о боте:

* Капча автоматически сохраняется и доступна на странице: [http://localhost:4001/captcha](http://localhost:4001/captcha)
* Управление ботом находится здесь: [http://localhost:4001/control](http://localhost:4001/control)

🛠️ Для корректной работы бота, перед запуском необходимо установить следующие библиотеки. Введите это в терминал:

```bash
npm install body-parser canvas express flayercaptcha mineflayer mineflayer-pathfinder mineflayer-web-inventory pngjs
```

Либо создайте `package.json` с зависимостями:

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

📦 После установки зависимостей, запустите бота командой:

```bash
node имя_файла_с_ботом.js
```

---

### 🇬🇧 English version:

Hi! I'm a beginner coder and I'd like to share a Minecraft bot I created for the **HolyWorld** server, based on the **mineflayer** library.

🔹 A bit about the bot:

* CAPTCHA images are sent directly to your browser at: [http://localhost:4001/captcha](http://localhost:4001/captcha)
* You can control the bot here: [http://localhost:4001/control](http://localhost:4001/control)

🛠️ To make the bot work properly, install the required libraries by running this in your terminal:

```bash
npm install body-parser canvas express flayercaptcha mineflayer mineflayer-pathfinder mineflayer-web-inventory pngjs
```

Or create a `package.json` file with the following dependencies:

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

📦 After installing the dependencies, start the bot with:

```bash
node your_bot_file_name.js
```

---


