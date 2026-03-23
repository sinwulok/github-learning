import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity, // for button
  Dimensions,
} from 'react-native';
import Card from './Card';

class App extends Component {
  // 1. 定義符號，隨機排序
  // 我們會製作 16 個卡牌按鈕，所以先在 state 中定義 8 個符號，然後複製一份為 16 個，再隨機排序，於 JSX 中 For-Loop 顯示出來。
  state = {
    cardSymbols: ['🥰', '🍔', '🍼', '💩', '🈲', '⭐️', '🇲🇴', '👍'],
    cardSymbolsInRand: [],

    // markdown card status
    isOpen: [],
    firstPickedIndex: null,
    secondPickedIndex: null,

    // 計算翻牌次數
    // 記錄玩家直至完成遊戲的翻牌次數，翻牌次數越少代表越高分。
    steps: 0,
    isEnded: false,
  };
  // 1. Random array
  // 1. 隨機排序，於 JSX 中 For-Loop 顯示出來。
  shuffleArray = arr => {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };

  // 4. 判斷卡牌是否為揭開的狀態
  // 我們會新增一個 state property，資料類型是 Array，名為 isOpen，這個 Array 共有 16 個內容，以 true 或 false 代表 16 個卡牌的翻開狀態。
  // componentDidMount() 調整
  componentDidMount() {
    // Duplicate Symbols x 2
    let newCardSymbols = [...this.state.cardSymbols, ...this.state.cardSymbols];
    let cardSymbolsInRand = this.shuffleArray(newCardSymbols);

    // 5. Setup array status observer
    // Init isOpen Array according to the length of symbol array
    let isOpen = [];
    for (let i = 0; i < newCardSymbols.length; i++) {
      isOpen.push(false);
    }

    this.setState({
      cardSymbolsInRand: cardSymbolsInRand,
      // the new array use for card open status
      // isOpen: [],
      isOpen: isOpen,
      // explain

      // 8. since the card had 2 match
      // then second card still need to markdown
      firstPickedIndex: null,
      secondPickedIndex: null,
    });
  }

  // 7. 於 App.js 新增一個事件處理函數 cardPressHandler：
  cardPressHandler = index => {
    let newIsOpen = [...this.state.isOpen];
    newIsOpen[index] = true;

    // 9. determind which card flip and does match second card
    // Check the current game flow
    if (
      this.state.firstPickedIndex == null &&
      this.state.secondPickedIndex == null
    ) {
      // First Choice
      this.setState({
        isOpen: newIsOpen,
        firstPickedIndex: index,
      });
    } else if (
      this.state.firstPickedIndex != null &&
      this.state.secondPickedIndex == null
    ) {
      // Second Choice
      this.setState({
        isOpen: newIsOpen,
        secondPickedIndex: index,
      });
    }

    // Count player score logic
    this.setState({
      steps: this.state.steps + 1,
    });

    // 16. f
  };

  // 10. 新增 calculateGameResult() 函數判斷遊戲結果：
  calculateGameResult = () => {
    if (
      this.state.firstPickedIndex != null &&
      this.state.secondPickedIndex != null
    ) {
      // Determind if two card are the same
      let firstSymbol =
        this.state.cardSymbolsInRand[this.state.firstPickedIndex];
      let secondSymbol =
        this.state.cardSymbolsInRand[this.state.secondPickedIndex];

      if (firstSymbol != secondSymbol) {
        // Incorrect, uncover soon
        setTimeout(() => {
          let newIsOpen = [...this.state.isOpen];
          newIsOpen[this.state.firstPickedIndex] = false;
          newIsOpen[this.state.secondPickedIndex] = false;

          this.setState({
            firstPickedIndex: null,
            secondPickedIndex: null,
            isOpen: newIsOpen,
          });
        }, 1000);
      } else {
        // Correct
        this.setState({
          firstPickedIndex: null,
          secondPickedIndex: null,
        });
      }
    }

    // 14. 判斷遊戲是否結束
    // 判斷方法是，當 state 的 isOpen 內的 true 數量等於總卡牌數量的話，即是所有牌已翻開，亦代表遊戲結束。
    if (this.state.cardSymbolsInRand.length > 0) {
      let totalOpens = this.state.isOpen.filter(isOpen => isOpen);
      if (totalOpens.length == this.state.cardSymbolsInRand.length) {
        this.setState({
          isEnded: true,
        });
        return;
      }
    }
  };

  // 11. 於 componentDidUpdate(prevProps, prevState)，state 的 secondPickedIndex 有更新時觸發：
  componentDidUpdate(prevProps, prevState) {
    if (prevState.secondPickedIndex != this.state.secondPickedIndex) {
      this.calculateGameResult();
    }
  }

  render() {
    return (
      <>
        <StatusBar />
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            {/* 新增標題 */}
            <Text style={styles.heading}>Matching Game</Text>
          </View>
          <View style={styles.main}>
            {/* 1. Adding Matching Emojis */}
            {/* 2. Adding Emojis as Cards */}
            {/* <Card style={styles.button} fontSize={30} title="☺️"></Card>
            <Card
              style={styles.button}
              fontSize={30}
              title="☺️"
              cover="❓"
              isShow={true}></Card>
            <Card
              style={styles.button}
              fontSize={30}
              title="☺️"
              cover="❓"></Card> */}
            {/* 3. Change main block to gameBoard */}
            <View style={styles.gameBoard}>
              {/* {this.state.cardSymbolsInRand.map((symbol, index) => (
                <Card
                  key={index}
                  style={styles.button}
                  fontSize={30} // this.props.style by Card.js
                  title={symbol}
                  cover="❓"
                  isShow={true}></Card>
              ))} */}
              {/* 6. change all button into ?? */}
              {this.state.cardSymbolsInRand.map((symbol, index) => (
                <Card
                  key={index}
                  style={styles.button}
                  fontSize={30}
                  title={symbol}
                  cover="❓"
                  isShow={this.state.isOpen[index]}
                  // onPress={() => console.log(`clicked ${index}`)}
                  // onPress 指定到 cardPressHandler
                  onPress={() => this.cardPressHandler(index)}
                /> // if use </card> ESlint return error NOT self-closing
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            {/* 新增底部文字 */}
            {/* <Text style={styles.footerText}>Footer Text</Text> */}
            {/* 12. Add player score logic */}
            <Text style={styles.footerText}>
              {/* You have tried {this.state.steps} time(s). */}
              {/* 14.  */}

              {this.state.isEnded
                ? `Congrats! You have completed in ${this.state.steps} steps.`
                : `You have tried ${this.state.steps} time(s).`}
            </Text>
            {/*  */}
            {/* 判斷當 this.state.isEnded 時顯示重新開始遊戲的按鈕。 */}
            {this.state.isEnded ? (
              <TouchableOpacity
                onPress={this.resetGame}
                style={styles.tryAgainButton}>
                <Text style={styles.tryAgainButtonText}>Try Again</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // { header style}
  header: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    // { header styles //}
  },
  main: {
    flex: 3,
    backgroundColor: 'yellow',
  },
  // {footer style}
  footer: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    textAlign: 'center',
  }, // {footer style //}

  // add styles for emoji and touchButtons
  gameBoard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'center',
    margin: (Dimensions.get('window').width - 48 * 4) / (4 * 2) - 4 * 2,
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: (Dimensions.get('window').width - 48 * 4) / (4 * 2) - 4 * 2,
  },
  buttonText: {
    fontSize: 30,
  },

  // 14. add restart game styles
  tryAgainButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
  },
  tryAgainButtonText: {
    fontSize: 18,
  },
});

export default App;
