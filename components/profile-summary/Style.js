import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  summaryItem: {
    // flex: 1,
    alignItems: 'center',
    width: 60
  },
  title: {
    color: '#fff',
    textTransform: 'uppercase', // Not supported on Android as per https://github.com/facebook/react-native/issues/2088
    fontSize: 10
  },
  content: {
    height: 40,
    justifyContent: 'center'
  }
});
