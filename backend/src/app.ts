import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'
// import { corsOptions } from './config'
const app = express()

// Middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api', routes)

app.get('/', (_req, res) => {
    res.send('API is running')
})

export default app
