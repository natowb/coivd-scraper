import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ScrapeContext } from "./ScrapeContext";
export default function Data() {
  const { scrapes } = useContext(ScrapeContext);
  console.log(scrapes);
  return (
    <View>
      <Text>
        Your Data:{" "}
        {scrapes.worldwide.length > 0 && scrapes.worldwide[0].confirmed}
      </Text>
    </View>
  );
}
