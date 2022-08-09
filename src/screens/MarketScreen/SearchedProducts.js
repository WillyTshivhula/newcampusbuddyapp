import React from "react";
import { FlatList, StyleSheet, Text, View, Dimensions } from "react-native";

var { width } = Dimensions.get("window")

const SearchedProducts = (props) => {
    const { productsFiltered } = props;
  return (
    <View style={{ width: width }}>
      {productsFiltered.length > 0 ? (
            productsFiltered.map((item) => (
                <FlatList
                    //onPress={navigation}
                    key={item.id}
                    avatar
                >
                    <View>
                        <View
                            source={{uri: item.image ? 
                                item.image : "https://static.thenounproject.com/png/1554489-200.png"
                                    }}
                        >
                            <View>
                                <Text>{item.name}</Text>
                                <Text note>{item.description}</Text>
                            </View>
                        </View>
                    </View>
                </FlatList>
            ))
      ) : (
          <View style={styles.center}>
              <Text style={{ alignSelf: 'center' }}>
                  No products match the selected criteria
              </Text>
          </View>
      )}
    </View>
  );
};

export default SearchedProducts;

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
