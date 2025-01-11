import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "@/config/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFirebaseError = (errorCode: string) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "O endereço de e-mail é inválido.";
      case "auth/user-disabled":
        return "Este usuário foi desativado.";
      case "auth/user-not-found":
        return "Usuário não encontrado.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      case "auth/email-already-in-use":
        return "O e-mail já está em uso.";
      case "auth/weak-password":
        return "A senha deve ter pelo menos 6 caracteres.";
      case "auth/network-request-failed":
        return "Erro de rede. Verifique sua conexão.";
      default:
        return "Ocorreu um erro desconhecido.";
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert("Sucesso", "Login bem-sucedido!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = handleFirebaseError((error as any).code);
        Alert.alert("Erro", errorMessage);
      } else {
        Alert.alert("Erro", "Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert("Sucesso", "Cadastro bem-sucedido!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage = handleFirebaseError((error as any).code);
        Alert.alert("Erro", errorMessage);
      } else {
        Alert.alert("Erro", "Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
        <Text style={styles.title}>CryptoTracker App</Text>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#6200ee" />
        ) : (
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={signIn} color="#6200ee" />
            <Button title="Sign Up" onPress={signUp} color="#03dac6" />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ee",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
});
