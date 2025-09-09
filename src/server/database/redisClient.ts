import {createClient} from "redis";
import dotenv from "dotenv";
dotenv.config();

export const client = createClient({
    url: process.env.REDIS_URL,
});

client.on("error", function (err) {
    console.error(err);
});
