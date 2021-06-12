import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from 'react-native'
import { Device } from './Interfaces'
import { Devices } from './Elements/Devices'
import * as Config from '../../../config.json'

import LoginForm from './LoginForm'

var AWS = require('aws-sdk') // eslint-disable-line
AWS.config.update({ region: 'eu-west-1' })

const placeholder = '/image/placeholder.svg'

export function App() {
  const [token, setToken] = useState({
    AccessKeyId: '',
    SecretAccessKey: '',
    SessionToken: '',
  })

  const [devices, setDevices] = useState([] as Device[])

  const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })

  function onLogin(data: any) {
    setToken(data.token)
    setDevices(data.devices)
  }

  function sendMessage(message: string) {
    sqs.config.update({
      accessKeyId: token.AccessKeyId,
      secretAccessKey: token.SecretAccessKey,
      sessionToken: token.SessionToken,
    })

    const params = {
      MessageBody: message,
      QueueUrl: Config.queue,
    }

    sqs.sendMessage(params, (err: any, data: any) => {
      if (err) {
        console.log('Error', err)
      } else {
        console.log('Success', data.MessageId)
      }
    })
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {token.AccessKeyId !== '' ? (
                <Devices devices={devices} sendMessage={sendMessage} />
              ) : (
                <LoginForm onLogin={(data: any) => onLogin(data)} />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
