import { Alert } from 'react-native'

/**
 * Alert that resolves to a boolean based on user choice
 * @param {String} title
 * @param {String} message
 * @param {String} okLabel
 * @param {String} cancelLabel
 * @returns {Promise|Boolean}
 */
let alertAsync = async (
  title: String,
  message?: String = '',
  okLabel?: String = 'OK',
  cancelLabel?: String = 'Cancel'
) => new Promise((resolve) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelLabel,
        onPress: () => resolve(false),
        style: 'cancel'
      },
      {
        text: okLabel,
        onPress: () => resolve(true)
      }
    ]
  )
})

export { alertAsync }
