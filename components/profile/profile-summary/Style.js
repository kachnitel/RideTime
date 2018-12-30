import { StyleSheet } from 'react-native'
import Layout from '../../../constants/Layout'

export default StyleSheet.create({
  summaryItem: {
    alignItems: 'center',
    width: Layout.window.wp(15),
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    textTransform: 'uppercase', // Not supported on Android as per https://github.com/facebook/react-native/issues/2088
    fontSize: Layout.window.hp(1.5)
  },
  content: {
    height: Layout.window.hp(5),
    justifyContent: 'center',
    textAlignVertical: 'center'
  }
})
