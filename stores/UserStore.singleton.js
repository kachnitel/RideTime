import UserStore from './UserStore.mobx'
import RidersProvider from '../providers/RidersProvider'
import applicationStore from './ApplicationStore.singleton'

const userStore = new UserStore(new RidersProvider(), applicationStore)
export default userStore
