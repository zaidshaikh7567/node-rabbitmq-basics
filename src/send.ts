import amqp from 'amqplib'
import { wait } from './utils'

const main = async () => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue('greet', { durable: false })
  channel.sendToQueue('greet', Buffer.from('Hello, World!'))
  await wait(500)
  await channel.close()
  await connection.close()
  process.exit(0)
}

main().catch(console.error)
