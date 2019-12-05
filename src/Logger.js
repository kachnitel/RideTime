import { getEnvVars } from '../constants/Env'
import * as SQLite from 'expo-sqlite'

class Logger {
  db = null

  constructor () {
    let columns = [
      'id integer PRIMARY KEY NOT NULL',
      'level text',
      'message text',
      'context text',
      'timestamp integer NOT NULL'
    ]

    this.db = SQLite.openDatabase('log.db')

    this.db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS log (' + columns.join(', ') + ');'
      )
      tx.executeSql( // Delete items older than a week
        'DELETE FROM log WHERE timestamp < ?',
        [(new Date()).getTime() - 1000 * 60 * 60 * 24 * 7]
      )
    })
  }

  _addMessage = (level: String, message: String, context) => {
    if (getEnvVars().dev) {
      let method = console[level]
      if (typeof method === 'function') {
        console[level](message, context)
      } else {
        console.warn('Failed logging to console', {
          level, message, context
        })
      }
    }

    this.db.transaction(
      (tx) => {
        tx.executeSql(
          'INSERT INTO log (level, message, context, timestamp) VALUES (?, ?, ?, ?);',
          [
            level,
            message,
            JSON.stringify(context),
            (new Date()).getTime()
          ]
          // (_, results) => console.log(results)
        )
      },
      (err) => console.warn('Error saving log to SQLite', err)
    )
  }

  /**
   * TODO: limit last N messages
   *
   * @memberof Logger
   */
  getMessages = async (count: Number = 10) => {
    let results = await this.executeSql(
      'SELECT * FROM (SELECT * FROM log ORDER BY id DESC LIMIT ?) ORDER BY id ASC;',
      [count]
    )

    return results
  }

  executeSql = async (sql: String, params: Array = []) => {
    return new Promise((resolve, reject) => this.db.transaction(
      (tx) => {
        tx.executeSql(sql, params, (_, { rows }) => resolve(rows._array), reject)
      },
      (err) => console.warn('Error running query: ' + sql, err)
    ))
  }

  debug = (message: String, context) => this._addMessage('debug', message, context)
  info = (message: String, context) => this._addMessage('info', message, context)
  warn = (message: String, context) => this._addMessage('warn', message, context)
  error = (message: String, context) => this._addMessage('error', message, context)
}

const logger = new Logger()
export { logger }
