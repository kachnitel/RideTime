import UserStore from './UserStore.mobx'
import EventStore from './EventStore.mobx'
import LocationStore from './LocationStore.mobx'
import TrailStore from './TrailStore.mobx'
import RouteStore from './RouteStore.mobx'
import RidesProvider from '../providers/RidesProvider'
import RidersProvider from '../providers/RidersProvider'
import LocationsProvider from '../providers/LocationsProvider'
import TrackingProvider from '../providers/TrackingProvider'
import applicationStore from './ApplicationStore.singleton'
import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'
import { logger } from '../Logger'
import CommentStore from './CommentStore.mobx'
import TrackingStore from './TrackingStore.mobx'

const stores = {
  user: null,
  event: null,
  location: null,
  trail: null,
  route: null,
  comment: null,
  tracking: null
}

stores.user = new UserStore(new RidersProvider(), stores, applicationStore)
stores.event = new EventStore(new RidesProvider(), stores)
let locationsProvider = new LocationsProvider()
stores.location = new LocationStore(locationsProvider, stores)
stores.trail = new TrailStore(locationsProvider, stores)
stores.route = new RouteStore(locationsProvider, stores)
stores.comment = new CommentStore(new RidesProvider(), stores)
stores.tracking = new TrackingStore(new TrackingProvider(), stores)

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

hydrate('locationStore', stores.location).then((data) => {
  logger.info(
    'Hydrated LocationStore',
    JSON.parse(JSON.stringify(
      data,
      (key, val) => key === 'stores' // Filter out stores
        ? '[' + Object.keys(stores).map((store) => stores[store].constructor.name).join(',') + ']'
        : val
    ))
  )
})

export default stores
