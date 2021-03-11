import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import * as FavoriteManager from "../components/FavoriteManager";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Product from "../components/Product";
import Constants from "expo-constants";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Delete Item
  const deleteItem = async (code) => {
    return await FavoriteManager.DeleteDataFavorite(code);
  };

  useEffect(() => {
    const fetchData = async () => {
      const datas = await FavoriteManager.LoadFavorite();

      setProducts(
        await Promise.all(
          datas.map(async (data) => {
            const response = await axios.get(
              `https://world.openfoodfacts.org/api/v0/product/${data}.json`
            );

            return response.data.product;
          })
        )
      );
      setIsLoading(false);
    };

    fetchData();
  });

  return isLoading ? (
    <SafeAreaView>
      <Text>Chargement</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.bgc}>
      <ScrollView style={styles.scrollView}>
        <Text>Favoris</Text>
        {products.map((product, index) => {
          return (
            <View key={index}>
              <StatusBar barStyle="dark-content" />
              <TouchableOpacity
                data={product}
                onPress={() => {
                  deleteItem(product.code);
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FavoriteProductsScreen", product);
                }}
              >
                <Product product={product} />
              </TouchableOpacity>
              <View style={styles.line}></View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  bgc: {
    backgroundColor: "white",
  },
  line: {
    height: 10,
    width: "90%",
    marginLeft: "10%",
    borderColor: "#F1F1F2",
    borderBottomWidth: 1,
  },
});
