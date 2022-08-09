import React, { Component } from "react";

import { View, Text, Alert } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
//import { styles } from ""
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

let Animals = [
    {
        id: 1,
        name: "Dog",
        damage: 150,
    },
    {
        id: 2,
        name: "Wolf",
        damage: 180,
    },
    {
        id: 3,
        name: "Jacket",
        damage: 130,
    },
];

function Item({ name, id, damage, navigation }) {
    const updateAnimal = (id) => {
        let updatedAnimal = Animals.find((__animal) => {
            return __animal.id === id;
        });

        Alert.prompt("Update Animal", "Enter New Name For Animal", (text) => {
            updatedAnimal.name = text;

            Animals = Animals.map((animal) =>
              animal.id == id ? { ...animal, ...updatedAnimal } : { ...animal }
            );

            navigation.reset({
                index: 0,
                routes: [{ name: "mainScreen" }],
            });
        });
    };

    const deleteAnimal = (id) => {
        Animals = Animals.filter((animal) => {
            return animal.id !== id;
        });

        navigation.reset({
            index: 0,
            routes: [{ name: "mainScreen" }],
        });
    };

    return (
        <TouchableOpacity onLongPress={() => updateAnimal(id)} style={Styles.Item}>
            <Text style={Styles.itemName}>{name}</Text>
            <Text style={styles.itemDamage}>{damage}</Text>
            <TouchableOpacity
              onPress={() => deleteAnimal(id)}
              style={styles.itemButton}
            >
              <FontAwesome5 
                style={{ color: "red", textAlign: "right"}}
                name="trash"
                size={18}
              />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

export default class mainScreen extends Component {
    addAnimal = () => {
        let animal = {
            id: Animals[Animals.length -1].id + 1,
            name: "",
            damage: 0,
        };

        Alert.prompt("Add Animal", "Animal Name", (text) => {
            animal.name = text;
            Alert.prompt("Add Animal", "Animal Damage", (text) => {
                animal.damage = text;

                Animals.push(animal);

                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: "mainScreen" }],
                });
            });
        });
    };

  render() {
    return (
      <LinearGradient style={StyleSheet.container} color={["#faf", "#acf"]}>
        <Text style={styles.header}>Animals List</Text>
      </LinearGradient>
    );
  }
}
