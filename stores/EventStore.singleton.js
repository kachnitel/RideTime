import EventStore from './EventStore.mobx'
import RidesProvider from '../providers/RidesProvider'
import userStore from './UserStore.singleton'

const eventStore = new EventStore(new RidesProvider(), userStore)
export default eventStore
