/* global __DEV__ */
import Constants from 'expo-constants'

const getLocalUrl = () => {
  const { manifest } = Constants

  // Use this for local development
  // (Assigns local network address)
  return 'http://' + ((typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:80`)
    : `apiUrl.example.com`) + '/ridetime'
}

const env = {
  dev: {
    apiUrl: getLocalUrl()
  },
  staging: {
    apiUrl: 'https://ridebikes.today'
  }
  // TODO: Use `Constants.manifest.releaseChannel` and
  // `exp publish --release-channel prod`
  // prod: {
  //   apiUrl: 'https://ridebikes.today'
  // }
}

export const getEnvVars = () => {
  // __DEV__ = false when published or --no-dev
  if (__DEV__ === true) {
    return env.dev
  } else {
    return env.staging
  }
}
