import React from "react";
import {View,StyleSheet} from 'react-native'

import LottieView from 'lottie-react-native'

const AppLoader=()=>{
    return(
        <View style={ [StyleSheet.absoluteFillObjectstyles,styles.container]}>
             <LottieView source={require('../../assets/loading.json')}autoPlay loop/>
             </View>
    );
};

const styles = StyleSheet.create({
    container:{}
})

export default AppLoader