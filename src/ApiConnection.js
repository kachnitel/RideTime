import { Connection } from './Connection'
import applicationStore from '../stores/ApplicationStore.singleton'
import { getEnvVars } from '../constants/Env'

export class ApiConnection extends Connection {
  getHeaders (override: Object = {}) {
    return super.getHeaders({
      'Authorization': applicationStore.accessToken ? 'Bearer ' + applicationStore.accessToken : '',
      ...override
    })
  }
}

export default new ApiConnection(getEnvVars().apiUrl)
