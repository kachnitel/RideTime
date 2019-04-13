import UserStore, { User } from './UserStore.mobx'
import RidersProvider from '../providers/RidersProvider'
import applicationStore from './ApplicationStore.singleton'

const userStore = new UserStore(new RidersProvider(), User, applicationStore)
export default userStore
