import { observable, action, computed } from 'mobx'
// import { create, persist } from 'mobx-persist'
// import { AsyncStorage } from 'react-native'

class ApplicationStore {
  @observable _accessToken = ''

  @action updateAccessToken (newValue) { this._accessToken = newValue }
  @computed get accessToken () { return this._accessToken }
}

/*
  We create and export a singleton (a single instance of our state).
  This allows us to use inject the same state across the app with ease.
  Some situations warrant having a new instance of state (e.g. login or sensitive state).
*/
const singleton = new ApplicationStore()
export default singleton

// const hydrate = create({
//   storage: AsyncStorage, // Choose our storage medium, ensure it's imported above
//   jsonify: true // if you use AsyncStorage, this needs to be true
// })

// // We hydrate anything we've persisted so that it is updated into the state on creation
// hydrate('persistedState', singleton).then((data) => {
//   console.log('Hydrated persisted data ', data)
// })
