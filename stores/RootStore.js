import UserStore from './UserStore.mobx'
import ApplicationStore from './ApplicationStore.mobx'
import RidersProvider from '../providers/RidersProvider'
import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'

export class RootStore {
  constructor () {
    this.userStore = new UserStore(this, RidersProvider)

    let applicationStore = new ApplicationStore(this)

    const hydrate = create({
      storage: AsyncStorage,
      jsonify: true
    })

    hydrate('persistedState', applicationStore).then((data) => {
      console.log('Hydrated persisted data ', data)
    })
    this.appStore = applicationStore
  }
}

const rootStore = new RootStore()
export default rootStore
