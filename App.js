import * as React from "react";
import { View, Text, Image } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { FontAwesome } from "@expo/vector-icons";

import Home from "./components/screens/Home";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class AppContainer extends React.Component {
  state = {
    isReady: false
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/01.png"),
      require("./assets/02.png"),
      require("./assets/03.png"),
      require("./assets/04.png"),
      require("./assets/05.png"),
      require("./assets/06.png"),
      require("./assets/symptoms.png"),
      require("./assets/breathelessness.gif"),
      require("./assets/home.jpg"),
      require("./assets/map.png"),
      require("./assets/pmdonate.png")
    ]);
    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <Home />;
  }
}
