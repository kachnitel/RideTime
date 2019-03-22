import UserStore from './UserStore.mobx'
import ApplicationStore from './ApplicationStore.mobx'

export default class RootStore {
  userStore: UserStore
  appStore: ApplicationStore
}
