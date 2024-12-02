import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";

const CareTipsScreen = () => {
  const [tips, setTips] = useState<any[]>([]);

  useEffect(() => {
    const fetchCareTips = async () => {
      try {
        const response = await axios.get("https://api.thedogapi.com/v1/breeds");
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching care tips:", error);
      }
    };

    fetchCareTips();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.card}>
        {/* Check if the image exists; otherwise, show a placeholder */}
        {/* {item.image?.url ? (
          <Image source={{ uri: item.image.url }} style={styles.image} />
        ) : (
          <Image
            source={require("../assets/placeholder-image.jpg")} // Add a placeholder image to your assets
            style={styles.image}
          />
        )} */}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.temperament || "No description available"}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tips}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  card: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: "100%", height: 150, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  description: { fontSize: 14, color: "#555", marginTop: 5 },
});

export default CareTipsScreen;
