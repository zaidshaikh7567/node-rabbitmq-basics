import amqp from 'amqplib'

const main = async () => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue('greet', { durable: false })
  await channel.consume(
    'greet',
    (msg) => {
      if (msg?.content) {
        console.log(msg.content.toString())
      }
    },
    { noAck: true }
  )
}

main().catch(console.error)
