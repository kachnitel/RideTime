import LocationStore from './LocationStore.mobx'
import LocationsProvider from '../providers/LocationsProvider'

const locationStore = new LocationStore(new LocationsProvider())
export default locationStore
