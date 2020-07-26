import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Page from "./components/Page";
import Data from "./components/Data";

export default function App() {
  return (
    <Page>
      <Text>Home Page {"\n"}</Text>
      <Data />
    </Page>
  );
}
