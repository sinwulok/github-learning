import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Animated,
  TouchableOpacity,
  interpolate,
  Vibration
} from 'react-native';

var Sound = require('react-native-sound');

class App extends Component {
  state = {
    corrects: 0,
    currentIndex: 0,
    buttonClass: [{}, {}, {}, {}],
    // react native does not support class
    // switch to object
    statusBarWidth: new Animated.value(1),

    // let topics = {};

    topics: [
      {
        question: 'JavaScript 與 Java 有什麼關係？',
        answers: [
          {
            value: '同公司的產品',
            correct: false,
          },
          {
            value: '新版與舊版的關係',
            correct: false,
          },
          {
            value: '一點關係也沒有',
            correct: true,
          },
          {
            value: 'JavaScript 是 Java 的 Web 版本',
            correct: false,
          },
        ],
      },
      {
        question: '發明 React JS 的公司是？',
        answers: [
          {
            value: 'Google',
            correct: false,
          },
          {
            value: 'Facebook',
            correct: true,
          },
          {
            value: 'Apple',
            correct: false,
          },
          {
            value: 'Microsoft',
            correct: false,
          },
        ],
      },
    ],

    sounds: {
      correct: null,
      incorrect: null,
    },
  };

  next = (index, correct) => {
    // 1. corrects + 1 if the answer is correct
    // 在 next(index, correct) 中，加入播放音訊的代碼
    if (correct) {
      this.setState({
        corrects: this.state.corrects + 1,
      });
      	
        this.state.sounds.correct.play()
      } else {
        this.state.sounds.incorrect.play()
        Vibration.vibrate(500)

      }
    }

    // 2. React Native
    let newButtonBackgroundColor = [...this.state.buttonBackgroundColor];
    newButtonBackgroundColor[index] = correct
      ? {backgroundColor: '#4FFF87'}
      : {backgroundColor: '#FF7056'};

    this.setState({
      buttonBackgroundColor: newButtonBackgroundColor,
    });

    // 3. Change Topic
    // setTimeout(() => {
    //   this.setState({
    //     currentIndex: this.state.currentIndex + 1,
    //     buttonClass: [],
    //     statusBarWidth: `${
    //       ((this.state.currentIndex + 1) / this.state.topics.length) * 100
    //     }%`,
    //   });
    // }, 1200);

    // 3. Change Topic
    setTimeout(() => {
      Animated.timing(this.state.statusBarWidth, {
        toValue:
          ((this.state.currentIndex + 1) / this.state.topics.length) * 100,
        duration: 500,
      }).start();

      this.setState({
        currentIndex: this.state.currentIndex + 1,
        buttonBackgroundColor: [{}, {}, {}, {}],
      });
    }, 1200);
  };

  startOver = () => {
    setTimeout(() => {
      this.setState({
        corrects: 0,
        currentIndex: 0,
        // buttonClass: [],
        // statusBarWidth: '1%',

        // react native does not support class
        // switch to object
        buttonClass: [{}, {}, {}, {}],
        statusBarWidth: new Animated.value(1),
      });
    }, 300);
  };

  componentDidMount() {
    document.addEventListener('touchstart', function () {}, false);

    // 在 componentDidMount() 的位置，預載兩個音訊檔案
    let correct = new Sound('correct.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });

    let incorrect = new Sound('incorrect.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });

    this.setState({
      sounds: {
        correct: correct,
        incorrect: incorrect,
      },
    });
  }

  render() {
    // adding new aminated for react native trigger animated
    const width = this.state.statusBarWidth.interpolate({
      inputRange: [0, 100],
      outputRange: [0, Dimensions.get('window').width],
    });

    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={{
              ...styles.statusBar,
              width: width,
            }}></Animated.View>

          {this.state.currentIndex < this.state.topics.length ? (
            <View style={styles.topicsContainer}>
              <Text style={styles.title}>
                {this.state.topics[this.state.currentIndex].question}
              </Text>

              {this.state.topics[this.state.currentIndex].answers.map(
                (answer, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.next(index, answer.correct)}>
                      <View
                        style={{
                          ...styles.button,
                          ...this.state.buttonBackgroundColor[index],
                          // backgroundColor: 'green',
                        }}>
                        <Text style={styles.buttonTitle}>{answer.value}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                },
              )}
            </View>
          ) : (
            <View style={styles.result}>
              <Text style={styles.resultTitle}>Completed!</Text>
              <Text style={styles.resultScore}>
                Your Score is{' '}
                {Math.round(
                  (this.state.corrects / this.state.topics.length) * 100,
                ) || 0}
              </Text>
              <TouchableOpacity onPress={this.startOver}>
                <View style={styles.button}>
                  <Text style={styles.buttonTitle}>Start Over</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 5,
    backgroundColor: '#FFBA4F',
  },
  topicsContainer: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    marginTop: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  buttonTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  result: {
    marginTop: 120,
    padding: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultScore: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});
