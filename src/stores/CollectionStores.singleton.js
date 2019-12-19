import UserStore from './UserStore.mobx'
import EventStore from './EventStore.mobx'
import LocationStore from './LocationStore.mobx'
import TrailStore from './TrailStore.mobx'
import RouteStore from './RouteStore.mobx'
import RidesProvider from '../providers/RidesProvider'
import RidersProvider from '../providers/RidersProvider'
import LocationsProvider from '../providers/LocationsProvider'
import applicationStore from './ApplicationStore.singleton'
import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'
import { logger } from '../Logger'
import CommentStore from './CommentStore.mobx'

const stores = {
  user: null,
  event: null,
  location: null,
  trail: null,
  route: null,
  comment: null
}

stores.user = new UserStore(new RidersProvider(), stores, applicationStore)
stores.event = new EventStore(new RidesProvider(), stores)
let locationsProvider = new LocationsProvider()
stores.location = new LocationStore(locationsProvider, stores)
stores.trail = new TrailStore(locationsProvider, stores)
stores.route = new RouteStore(locationsProvider, stores)
stores.comment = new CommentStore(new RidesProvider(), stores)

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

hydrate('locationStore', stores.location).then((data) => {
  logger.info(
    'Hydrated LocationStore',
    JSON.stringify(
      data,
      (key, val) => key === 'stores' ? undefined : val // Filter out stores
    )
  )
})

export default stores
