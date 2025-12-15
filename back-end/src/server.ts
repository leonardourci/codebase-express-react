import app from './app'
import globalConfig from './utils/globalConfig'

app.listen(globalConfig.restPort, () => {
	if (globalConfig.nodeEnv === 'development') console.log(`Local server is running at http://localhost:${globalConfig.restPort}`)
	if (globalConfig.nodeEnv === 'production') console.log(`Server is running at port ${globalConfig.restPort}`)
})
