const app = express()

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

app.get("/test", (req, res) => {
  res.send("<h1>It's working 🤗</h1>")
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))
