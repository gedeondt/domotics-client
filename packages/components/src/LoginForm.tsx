import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Image } from 'react-native'
import { AppButton } from './Elements/AppButton'
import * as Config from '../../../config.json'

export default class LoginForm extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: false,
    }
  }

  onLogin() {
    const { username, password } = this.state
    const { onLogin } = this.props

    fetch(Config.loginURL, {
      method: 'POST',
      body: JSON.stringify({
        user: username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ error: false })
        onLogin(json)
      })
      .catch((error) => {
        this.setState({ error: true })
      })
  }

  render() {
    const { error, username, password } = this.state

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: '/icons/login.svg' }} />
        {!error ? null : (
          <Text style={styles.error}>Check your credentials</Text>
        )}
        <TextInput
          value={username}
          onChangeText={(text) => this.setState({ username: text })}
          placeholder="Username"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />

        <AppButton title="Login" onPress={() => this.onLogin()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#006df0',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  error: {
    color: '#f00',
    padding: 10,
  },
})
