import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db, auth } from "@/constants/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const PetListScreen = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
          collection(db, "pets"),
          where("userId", "==", user.uid) // Fetch pets only for the logged-in user
        );

        const querySnapshot = await getDocs(q);
        const petList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPets(petList);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Name: {item.name}</Text>
            <Text>Breed: {item.breed}</Text>
            <Text>Age: {item.age}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 15, marginBottom: 10, backgroundColor: "#f9f9f9", borderRadius: 5 },
});

export default PetListScreen;
