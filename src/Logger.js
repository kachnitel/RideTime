import { getEnvVars } from '../constants/Env'

class Logger {
  log (message: String, context) {
    console.log(message, context, getEnvVars().dev)
  }
}

const logger = new Logger()
export { logger }
