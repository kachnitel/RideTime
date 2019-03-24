import EventStore from './EventStore.mobx'
import RidesProvider from '../providers/RidesProvider'

const eventStore = new EventStore(new RidesProvider())
export default eventStore
