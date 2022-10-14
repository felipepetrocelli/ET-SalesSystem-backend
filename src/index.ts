import app from './app/index'
import "dotenv/config"

const port = 3333

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))