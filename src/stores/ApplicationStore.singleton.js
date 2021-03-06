import ApplicationStore from './ApplicationStore.mobx'
import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'
import { logger } from '../Logger'

const applicationStore = new ApplicationStore()

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

hydrate('applicationStore', applicationStore).then((data) => {
  logger.info('Hydrated ApplicationStore', data)
})

export default applicationStore
