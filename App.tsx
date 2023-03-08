import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";

export default function App() {
  const [biometricType, setBiometricType] = useState<string | null>(null);

  async function checkBiometrics() {
    const isSupported = await LocalAuthentication.hasHardwareAsync();
    if (isSupported) {
      const biometricTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setBiometricType(biometricTypes[0].toString());
    } else {
      console.log("Biometric authentication not supported");
    }
  }

  async function authenticate() {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      console.log("Authenticated successfully");
    } else {
      console.log("Authentication failed");
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="Check biometrics" onPress={checkBiometrics} />
      <Button title="Authenticate" onPress={authenticate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
  },
});