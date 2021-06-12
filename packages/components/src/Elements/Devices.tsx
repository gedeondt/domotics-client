import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { AppButton } from './AppButton'
import { Device } from '../Interfaces'

type DevicesProps = {
  devices: Device[]
  sendMessage: (message: string) => void
}

export const Devices = ({ devices, sendMessage }: DevicesProps) => (
  <>
    <Image style={styles.image} source={{ uri: '/icons/blinds.svg' }} />
    {devices.map((item, i) => (
      <>
        <AppButton
          onPress={() => sendMessage(`${item.address}11112222`)}
          title={`Bajar ${item.id}`}
        />
        <AppButton
          onPress={() => sendMessage(`${item.address}11113333`)}
          title={`Subir ${item.id}`}
        />
      </>
    ))}
  </>
)

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
})
