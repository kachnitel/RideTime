import UserStore, { User } from './UserStore.mobx'
import RidersProvider from '../providers/RidersProvider'

const userStore = new UserStore(new RidersProvider(), User)
export default userStore
