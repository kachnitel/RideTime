import RootStore from './RootStore.mobx'
import UserStore from './UserStore.mobx'
import ApplicationStore from './ApplicationStore.mobx'
import RidersProvider from '../providers/RidersProvider'
import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'

const rootStore = new RootStore()
const applicationStore = new ApplicationStore(rootStore)

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

hydrate('persistedState', applicationStore).then((data) => {
  console.log('Hydrated persisted data ', data)
})

rootStore.appStore = applicationStore
rootStore.userStore = new UserStore(rootStore, new RidersProvider())
export default rootStore
