import LocationStore, { Location } from './LocationStore.mobx'
import LocationsProvider from '../providers/LocationsProvider'

const locationStore = new LocationStore(new LocationsProvider(), Location)
export default locationStore
