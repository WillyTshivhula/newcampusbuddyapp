import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar } from "react-native-paper";

const MyBuddies = () => {
  const MyBuddiesCard = () => {
    return (
      <View>
        <View style={styles.root}>
          <Image
            style={styles.image}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU_yUQWTyRk8GM0SWoGmPidjSrBZwlkOeG4A&usqp=CAU",
            }}
          />

          <View style={styles.rightContainer}>
            <Text style={styles.title} numberOfLines={3}>
              Logitech MX Master 3 Advanced Wireless Mouse for Mac - Bluetooth
            </Text>
            {/* Ratings */}
            {/* <View style={styles.ratingsContainer}>
                
                </View> */}
            <Text style={styles.price}>from $13.57</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      {/* Render Product Component */}
      <MyBuddiesCard />
    </View>
  );
};

export default MyBuddies;

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  root: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  image: {
    flex: 2,
    height: 150,
    //resizeMode: 'contain',
  },
  rightContainer: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
