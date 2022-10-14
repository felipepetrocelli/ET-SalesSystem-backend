import mongoose from "mongoose";
import "dotenv/config"

const mongoURL = 'mongodb://localhost:27017'

export default function connectMongoDb(): void {
    if (mongoURL) {

        mongoose.connect(mongoURL, () => console.log('Conectado no MongoDb'))

    } else {
        console.log('Falha ao conectar no Banco')
    }
}
