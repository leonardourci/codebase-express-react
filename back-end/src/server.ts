import app from './app'

const { REST_PORT, ENVIRONMENT } = process.env

const PORT = Number(REST_PORT)

app.listen(PORT, () => {
  if (ENVIRONMENT === 'development') console.log(`Local server is running at http://localhost:${PORT}`)
  if (ENVIRONMENT === 'production') console.log(`Server is running at port ${PORT}`)
})
