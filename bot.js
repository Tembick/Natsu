const mineflayer = require('mineflayer')
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const mineflayerWebInventory = require('mineflayer-web-inventory')
const { PNG } = require('pngjs')
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const nearbyPlayers = {} // { username: [{name, x, y, z}] }



const PASSWORD = 'Ваш пароль'
const CAPTCHA_DIR = path.join(__dirname, 'captchas')
if (!fs.existsSync(CAPTCHA_DIR)) fs.mkdirSync(CAPTCHA_DIR)

const usernames = [
Ывши аккаунты 
]
const bots = []
let captchaImages = []
let awaitingCaptcha = false
let captchaCaptureTimer = null
const botCommands = []


function getColor(id) {
  const colors = [
    [0, 0, 0], [127, 178, 56], [247, 233, 163], [199, 199, 199],
    [255, 0, 0], [160, 160, 255], [167, 167, 167], [0, 124, 0],
    [255, 255, 255], [164, 168, 184], [151, 109, 77], [112, 112, 112],
    [64, 64, 255], [143, 119, 72], [255, 252, 245], [216, 127, 51],
  ]
  return colors[id % colors.length] || [0, 0, 0]
}
const botStates = []

function createBot(username, index) {
  const bot = mineflayer.createBot({ 
    host: 'айпи сервера',
    username,
    auth: 'offline',
    version: '1.18.2'
  })

 botStates[index] = {
  forward: false,
  back: false,
  left: false,
  right: false,
  jump: false,
  sprint: false,
  leftClick: false,
  rightClick: false,
  autoClick: false
}


  bot.loadPlugin(pathfinder)
  mineflayerWebInventory(bot, { port: 3000 + index, whitelist: [] })

  const mcData = require('minecraft-data')(bot.version)
  const movements = new Movements(bot, mcData)

  bot.once('spawn', () => {
    bot.pathfinder.setMovements(movements)
    console.log(`✅ ${username} вошёл`)
  })
setInterval(() => {
  const state = botStates[index]
  bot.setControlState('forward', state.forward)
  bot.setControlState('back', state.back)
  bot.setControlState('left', state.left)
  bot.setControlState('right', state.right)
  bot.setControlState('jump', state.jump)
  bot.setControlState('sprint', state.sprint)

  // ЛКМ
  if (state.leftClick && bot.targetDigBlock == null) {
    const block = bot.blockAtCursor(4)
    if (block) bot.dig(block, true).catch(() => {})
  }

  // ПКМ
  if (state.rightClick) bot.activateItem()

}, 100)
setInterval(() => {
  bots.forEach((bot, i) => {
    if (botStates[i]?.autoClick) {
      const target = bot.nearestEntity(e => e.type === 'mob' || e.type === 'player')
      if (target) bot.attack(target)
    }
  })
}, 1000)


setInterval(() => {
  const players = []
  for (const [name, entity] of Object.entries(bot.entities)) {
    if (entity.type === 'player' && name !== bot.username) {
      const dist = bot.entity.position.distanceTo(entity.position)
      if (dist <= 5000) {
        players.push({
          name,
          x: Math.floor(entity.position.x),
          y: Math.floor(entity.position.y),
          z: Math.floor(entity.position.z)
        })
      }
    }
  }
  nearbyPlayers[bot.username] = players
}, 4000)

  bot.on('message', (msg) => handleMessages(bot, msg))
  bot.on('windowOpen', (window) => handleWindow(bot, window))

bot._client.on('map', (packet) => {
  if (!awaitingCaptcha || !packet.data) return
  const image = new PNG({ width: 128, height: 128 })
  for (let i = 0; i < packet.data.length; i++) {
    const color = getColor(packet.data[i])
    image.data[i * 4 + 0] = color[0]
    image.data[i * 4 + 1] = color[1]
    image.data[i * 4 + 2] = color[2]
    image.data[i * 4 + 3] = 255
  }
    const fileName = `captcha-${Date.now()}.png`
    const fullPath = path.join(CAPTCHA_DIR, fileName)
    image.pack().pipe(fs.createWriteStream(fullPath)).on('finish', () => {
      captchaImages.push(fileName)
      console.log(`📸 Капча сохранена: ${fileName}`)
    })
  })

  bot.on('end', () => reconnectBot(username, index))
  bot.on('error', (err) => console.log(`❗ Ошибка ${username}: ${err.message}`))
 
  bots.push(bot)
}

function reconnectBot(username, index) {
  console.log(`♻️ Переподключение ${username} через 5 секунд...`)
  setTimeout(() => createBot(username, index), 5000)
}

function handleMessages(bot, msg) {
  const text = msg.toString().replace(/§./g, '')
  console.log(`[${bot.username}]: "${text}"`)

  if (text.includes('Введите цифры с картинки')) {
    awaitingCaptcha = true
    captchaImages = []
    clearTimeout(captchaCaptureTimer)
    captchaCaptureTimer = setTimeout(() => {
      awaitingCaptcha = false
      console.log('📸 Капча получена')
    }, 3000)
  }

  if (text.includes('неправильно')) {
    awaitingCaptcha = true
    captchaImages = []
    clearTimeout(captchaCaptureTimer)
    captchaCaptureTimer = setTimeout(() => {
      awaitingCaptcha = false
      console.log('🔁 Капча перезапрошена')
    }, 3000)
  }

  if (text.includes('/register')) {
    bot.chat(`/register ${PASSWORD} ${PASSWORD}`)
    setTimeout(() => bot.chat(`/login ${PASSWORD}`), 1500)
  } else if (text.includes('/login')) {
    bot.chat(`/login ${PASSWORD}`)
  }

  if (text.includes('Приятной игры!')) {
    console.log(`✅ ${bot.username} вошёл полностью`)
  }

  if (text.includes('Уважаемый игрок!')) {
    bot.chat('/anarchy')
  }
}

async function handleWindow(bot, window) {
  const slot = 15
  await waitForSlot(window, slot)
  try {
    await bot.clickWindow(slot, 0, 0)
    console.log(`🖱️ ${bot.username} кликнул по слоту ${slot}`)
  } catch (err) {
    console.error(`❌ Ошибка при клике ${bot.username}: ${err.message}`)
  }
}

function waitForSlot(window, slot, timeout = 5000) {
  return new Promise(resolve => {
    const start = Date.now()
    const check = () => {
      if (window.slots && window.slots[slot]) return resolve(true)
      if (Date.now() - start > timeout) return resolve(false)
      setTimeout(check, 100)
    }
    check()
  })
}

function startAllBots() {
  usernames.forEach((username, index) => {
    setTimeout(() => {
      console.log(`🚀 Запуск ${username}`)
      createBot(username, index)
    }, index * 15000) // 30 сек
  })
}

startAllBots()

// 🧠 Веб-интерфейс
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/captcha-images', express.static(CAPTCHA_DIR))

app.get('/control', (req, res) => {
  const botList = bots.map((bot, i) => `
    <label>
      <input type="checkbox" name="bots" value="${i}" checked />
      ${bot.username}
    </label><br>
  `).join('')

  res.send(`
    <h2>🔧 Управление ботами</h2>
    <hr>
<h3>🎮 Управление движением</h3>
<h3>🎮 Полное управление ботами</h3>
<form method="POST" action="/move">
  ${botList}
  <p><strong>Передвижение:</strong></p>
  <label><input type="checkbox" name="action" value="forward" /> Вперёд</label>
  <label><input type="checkbox" name="action" value="back" /> Назад</label>
  <label><input type="checkbox" name="action" value="left" /> Влево</label>
  <label><input type="checkbox" name="action" value="right" /> Вправо</label>
  <label><input type="checkbox" name="action" value="jump" /> Прыжок</label>
  <label><input type="checkbox" name="action" value="sprint" /> Бег</label>

  <p><strong>Действия:</strong></p>
  <label><input type="checkbox" name="action" value="leftClick" /> ЛКМ удерж.</label>
  <label><input type="checkbox" name="action" value="rightClick" /> ПКМ удерж.</label>
  <label><input type="checkbox" name="action" value="autoClick" /> Автоклик (1/сек)</label><br><br>

  <button type="submit">▶ Выполнить</button>
</form>


<hr>
<h3>📍 Найденные игроки (обновляется каждые 4 сек)</h3>
${Object.entries(nearbyPlayers).map(([botName, players]) => `
  <strong>${botName}:</strong><br>
  <ul>
    ${players.length > 0 
      ? players.map(p => `<li>${p.name}: [${p.x}, ${p.y}, ${p.z}]</li>`).join('')
      : '<li>Нет игроков рядом</li>'
    }
  </ul>
`).join('')}

    <hr>
    <h3>⚡ Быстрые команды</h3>
    <form method="POST" action="/command">
      <input type="hidden" name="bots" value="${bots.map((_, i) => i).join(',')}" />
      <button name="cmd" value="/warp auction">🏛 Войти в аукцион</button>
      <button name="cmd" value="/ah sell 100 full">💰 Продать предмет</button>
      <button name="cmd" value="/home pvp">⚔ Телепорт в PvP</button>
      <button name="cmd" value="/repeat">🔁 Повторить последнюю</button>
    </form>

    <hr>
    <h3>📜 История команд</h3>
    <ul>
      ${botCommands.map(c => `<li>${c}</li>`).join('')}
    </ul>
    <a href="/captcha" target="_blank">🧩 Перейти к капче</a>
  `)
})

app.post('/command', (req, res) => {
  const cmd = req.body.cmd?.trim()
  const selected = Array.isArray(req.body.bots)
    ? req.body.bots.map(i => bots[i])
    : bots

  if (cmd) {
    selected.forEach(bot => bot.chat(cmd))
    botCommands.unshift(cmd)
    if (botCommands.length > 20) botCommands.pop()
  }

  res.redirect('/control')
})

app.post('/move', (req, res) => {
  const selected = Array.isArray(req.body.bots)
    ? req.body.bots.map(Number)
    : bots.map((_, i) => i)

  const allActions = [
    'forward', 'back', 'left', 'right',
    'jump', 'sprint',
    'leftClick', 'rightClick', 'autoClick'
  ]

  const actions = Array.isArray(req.body.action)
    ? req.body.action
    : [req.body.action]

  selected.forEach(i => {
    allActions.forEach(act => {
      botStates[i][act] = actions.includes(act)
    })
  })

  res.redirect('/control')
})



app.get('/captcha', (req, res) => {
  const sorted = [...captchaImages].sort()
  const rearranged = [...sorted]

  function swap(arr, i1, i2) {
    if (arr[i1] && arr[i2]) {
      [arr[i1], arr[i2]] = [arr[i2], arr[i1]]
    }
  }

  swap(rearranged, 0, 3)
  swap(rearranged, 4, 7)
  swap(rearranged, 8, 11)
  swap(rearranged, 1, 2)
  swap(rearranged, 5, 6)
  swap(rearranged, 9, 10)

  const total = rearranged.length
  const partSize = Math.ceil(total / 3)

  const topRow = rearranged.slice(-partSize)
  const midRow = rearranged.slice(total - 2 * partSize, total - partSize)
  const botRow = rearranged.slice(0, total - 2 * partSize)

  const rowToHTML = row => row.map(file =>
    `<img src="/captcha-images/${file}" width="128" height="128" style="image-rendering: pixelated;" />`
  ).join('')

  res.send(`
    <h2>🧩 Введите капчу</h2>
    <div style="display: flex; gap: 2px; margin-bottom: 10px;">
      ${rowToHTML(topRow)}
    </div>
    <div style="display: flex; gap: 2px; margin-bottom: 10px;">
      ${rowToHTML(midRow)}
    </div>
    <div style="display: flex; gap: 2px;">
      ${rowToHTML(botRow)}
    </div>
    <form method="POST" action="/submit" style="margin-top: 20px;">
      <input name="code" placeholder="Введите капчу" required maxlength="10" />
      <button type="submit">📨 Отправить</button>
    </form>
    <a href="/control">⬅ Назад</a>
  `)
})

app.post('/submit', (req, res) => {
  const code = req.body.code?.trim()
  if (!code) return res.redirect('/captcha')

  bots.forEach(b => {
  if (b && typeof b.chat === 'function') {
    b.chat(code)
  } else {
    console.warn(`⚠️ Пропущен бот: объект невалиден или отсутствует метод chat`)
  }
})

  captchaImages.forEach(file => fs.unlink(path.join(CAPTCHA_DIR, file), () => {}))
  captchaImages = []

  botCommands.unshift(`📨 ${code}`)
  res.redirect('/captcha')
})

app.listen(4001, () => console.log('🌍 Панель: http://localhost:4001/control'))
