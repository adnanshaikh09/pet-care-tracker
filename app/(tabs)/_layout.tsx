import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="addPet"
        options={{
          title: "Add Pet",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="petList"
        options={{
          title: "Pet List",
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="careTips"
        options={{
          title: "Care Tips",
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
