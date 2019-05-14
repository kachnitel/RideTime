import LocationStore, { Location } from './LocationStore.mobx'
import LocationsProvider from '../providers/LocationsProvider'
import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'

const locationStore = new LocationStore(new LocationsProvider(), Location)

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

hydrate('persistedState', locationStore).then((data) => {
  console.log('Hydrated LocationStore', JSON.stringify(data))
})

export default locationStore
