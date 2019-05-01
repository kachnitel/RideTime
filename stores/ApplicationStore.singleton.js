import ApplicationStore from './ApplicationStore.mobx'
import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'

const applicationStore = new ApplicationStore()

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

hydrate('persistedState', applicationStore).then((data) => {
  console.log('Hydrated ApplicationStore', JSON.stringify(data))
})

export default applicationStore
