import UserStore from './UserStore.mobx'
import EventStore from './EventStore.mobx'
import LocationStore from './LocationStore.mobx'
import RidesProvider from '../providers/RidesProvider'
import RidersProvider from '../providers/RidersProvider'
import LocationsProvider from '../providers/LocationsProvider'
import applicationStore from './ApplicationStore.singleton'
import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'

const stores = {
  user: null,
  event: null,
  location: null
}

stores.user = new UserStore(new RidersProvider(), stores, applicationStore)
stores.event = new EventStore(new RidesProvider(), stores)
stores.location = new LocationStore(new LocationsProvider(), stores)

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

hydrate('locationStore', stores.location).then((data) => {
  console.log(
    'Hydrated LocationStore',
    JSON.stringify(
      data,
      (key, val) => key === 'stores' ? undefined : val // Filter out stores
    )
  )
})

export default stores
