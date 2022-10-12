const mineflayer = require('mineflayer')

const host = process.env.HOST_SERVER
const username = process.env.HOST_USERNAME
const password = process.env.HOST_PASSWORD

export default function handler(req, res) {
	if (req.method === 'POST') {
		const bot = mineflayer.createBot({
			host,
			username,
			version: 1.18,
		})
		bot.on('kicked', console.log)
		bot.on('error', console.log)

		//// Mimic ECB Login
		bot.once('spawn', async () => {
			await bot.waitForChunksToLoad()
			await bot
				.waitForTicks(12)
				.then(() => bot.chat('/login ' + password))
				.then(() =>
					console.log(
						' ------------------------------\n',
						'|           Logged In          |\n',
						' ------------------------------'
					)
				)
			await bot
				.waitForTicks(12)
				.then(() => bot.chat('/server Survival'))
				.then(() =>
					console.log(
						' ------------------------------\n',
						'|       Going to Survival      |\n',
						' ------------------------------'
					)
				)
		})

		//// <-- Look at Player -->
		function lookAtPlayer() {
			const playerFilter = entity => entity.type === 'player'
			const playerEntity = bot.nearestEntity(playerFilter)

			if (!playerEntity) return

			const plrPos = playerEntity.position.offset(0, playerEntity.height, 0)
			bot.lookAt(plrPos)
		}
		bot.on('physicTick', lookAtPlayer)
		res.status(200).json({ message: 'Started' })
	} else {
		res.status(200).json({ error: 'Method not allowed' })
	}
}
