import express, { json, urlencoded } from 'express'
import cookieParser from "cookie-parser";
const app = express()
import productRouter from './routes/products/index.js'
import authRouter from './routes/auth/index.js'


const port = process.env.PORT || 3000

app.use(cookieParser())
app.use(urlencoded({ extended: false }))
app.use(json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/product", productRouter)
app.use("/auth", authRouter);


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})
