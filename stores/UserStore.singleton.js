import UserStore from './UserStore.mobx'
import RidersProvider from '../providers/RidersProvider'

const userStore = new UserStore(new RidersProvider())
export default userStore
