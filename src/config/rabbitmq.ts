import amqplib from "amqplib";
import logger from "../utils/logger";

let channel: amqplib.Channel;

const connectRabbitMQ = async (): Promise<void> => {
  try {
    const connection = await amqplib.connect(
      process.env.RABBITMQ_URL || "amqp://localhost"
    );
    channel = await connection.createChannel();
    logger.info("RabbitMQ Connected");
  } catch (error) {
    logger.error(`RabbitMQ Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

const getChannel = (): amqplib.Channel => {
  if (!channel) throw new Error("RabbitMQ not connected");
  return channel;
};

export { connectRabbitMQ, getChannel };