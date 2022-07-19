import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighLight,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

var { width } = Dimensions.get("window");

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnEdit}
              onPress={() => [
                props.navigation.navigate("ProductForm", { item: props }),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => [props.delete(props._id), setModalVisible(false)]}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("ProductInfo", { item: props }); //navigate to product Info for the particular item
        }}
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.container,
          {
            backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro",
          },
        ]}
      >
        <Image
          source={{
            uri: props.image
              ? props.image
              : "https://static.thenounproject.com/png/1554489-200.png",
          }}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.item}>{props.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.title}
        </Text>
        {/*<Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.category.name}</Text>*/}
        <Text style={styles.item}>R {props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnEdit: {
    flexDirection: "row",
    borderRadius: 3,
    padding: 10,
    margin: 5,
    justifyContent: "center",
    //background: transparent,
    backgroundColor: "#62b1f6",
    width: 100,
  },
  btnDelete: {
    flexDirection: "row",
    borderRadius: 3,
    padding: 10,
    margin: 5,
    justifyContent: "center",
    //background: transparent,
    width: 100,
    backgroundColor: "#f40105",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});
