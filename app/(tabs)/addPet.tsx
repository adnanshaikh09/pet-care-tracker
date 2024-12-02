import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db, auth } from "@/constants/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "expo-router";

const AddPetScreen = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter(); // Use useRouter for navigation

  const addPet = async () => {
    try {
      const user = auth.currentUser; // Get the logged-in user
      if (!user) {
        Alert.alert("Error", "No user is logged in!");
        return;
      }

      await addDoc(collection(db, "pets"), {
        name,
        breed,
        age,
        userId: user.uid, // Associate the pet with the current user
      });

      Alert.alert("Success", "Pet added successfully!");
      router.replace("/"); // Navigate back to the main tab (Dashboard)
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />
      <Button title="Add Pet" onPress={addPet} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default AddPetScreen;
