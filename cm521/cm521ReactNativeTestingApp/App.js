import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {WebView} from 'react-native-webview';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <Text style={styles.title}>cm521</Text> */}
        <WebView
          source={{uri: 'https://boisterous-hamster-bcd2ab.netlify.app/'}}
          style={styles.webviewcontainer}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 20,
    margin: 10,
    borderWidth: 4,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },

  webviewcontainer: {
    flex: 1,
  },
});
// ...
const WebViewComponent = () => {
  return <></>;
};

export default App;
