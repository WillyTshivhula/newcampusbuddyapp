/*
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Carousel from 'react-native-snap-carousel';

const BLUE='#102d66';
const YELLOW='#ffa600';

const AddPostView = ({
    newImages,
    addImage,
}) => {
    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide} key={index}>
                <Image
                    style={{
                        width:'88%',
                        borderRadius: 15,
                        height: 200,
                    }}
                    source={{uri: item.path}}
                />
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                </View>
            </View>
        );
    };

    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./assets/images/Logo_1.PNG')} style={{height: 50, width:50}}/>
          </View>
          {
            newImages?.length > 0 ? (
                <Carousel
                  data={newImages}
                  renderItem={_renderItem}
                  onSnapToItem={(index) => console.log(index)}
                  sliderWidth={400}
                  itemWidth={400}
                  vertical={false}
                />
            ) : (
                <TouchableOpacity
                  onPress={addImage}
                  style={styles.noImage}
                >
                  <Text style={styles.text}>
                    Add an Image
                  </Text>
                </TouchableOpacity>
            )
          }
        </View>
    )
}

export default AddPostView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  noImage: {
    backgroundColor: '#E9EDF3',
    height: 200,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems:'center',
  }
});
*/