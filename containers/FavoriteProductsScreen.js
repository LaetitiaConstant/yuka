import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Product from "../components/Product";
import ProductComplete from "../components/ProductComplete";
import ProductHeader from "../components/ProductHeader";

export default function FavoriteProductsScreen(data) {
  const navigation = useNavigation();

  const product = data.route.params;

  return (
    <SafeAreaView style={styles.scroll}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AntDesign name="left" size={24} color="black" />
        <Text>Historique</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <ProductHeader product={product} />
        <ProductComplete product={product} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  goBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
  },
});