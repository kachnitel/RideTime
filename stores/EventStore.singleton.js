import EventStore, { Event } from './EventStore.mobx'
import RidesProvider from '../providers/RidesProvider'

const eventStore = new EventStore(new RidesProvider(), Event)
export default eventStore
