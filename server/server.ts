import app from "./src/app"
import { envConfig } from "./src/config/config"

import "./src/database/connection"

const startServer = () => {
    const port = envConfig.portNumber
    
    app.listen(port,() => {
        console.log(`Server started at port ${port}`)
    })
}

startServer()