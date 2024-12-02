import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/constants/firebase"; // Adjust the path to your Firebase configuration
import { useRouter } from "expo-router";

const SignupScreen = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const router = useRouter(); // Use expo-router's navigation hook

  const handleSignup = async () => {
    try {
      // Sign up the user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Navigate to the (tabs) layout after signup
      router.replace("/(tabs)");
    } catch (error: any) {
      // Display an error message if signup fails
      Alert.alert("Signup Error", error.message || "An error occurred during signup.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Sign Up" onPress={handleSignup} />

      {/* Navigation to Login Screen */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  link: {
    marginTop: 15,
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
  },
});

export default SignupScreen;
