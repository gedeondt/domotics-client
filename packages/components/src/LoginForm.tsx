import React, { Component } from 'react'
import { Text, Button, TextInput, View, StyleSheet } from 'react-native'

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

    fetch('https://lpvy55ly9i.execute-api.eu-west-1.amazonaws.com/default/', {
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

        <Button title="Login" onPress={() => this.onLogin()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  error: {
    color: '#f00',
    padding: 10,
  },
})
