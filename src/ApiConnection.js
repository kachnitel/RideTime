import { Connection } from './Connection'
import applicationStore from './stores/ApplicationStore.singleton'
import { getEnvVars } from '../constants/Env'
import Constants from 'expo-constants'
import { Platform } from '@unimodules/core'

export class ApiConnection extends Connection {
  getHeaders (override: Object = {}) {
    return super.getHeaders({
      'Authorization': applicationStore.accessToken ? 'Bearer ' + applicationStore.accessToken : '',
      'User-Agent': `${Constants.manifest.name}/${getEnvVars().version};` +
        `${Constants.nativeAppVersion};${Constants.nativeBuildVersion} ` +
        `(${Platform.OS} ${Constants.systemVersion}) ` +
        `${Constants.deviceName}`,
      ...override
    })
  }
}

export default new ApiConnection(getEnvVars().apiUrl)
