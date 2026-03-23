// add Card.js let each button as Card Object
import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

class Card extends Component {
  render() {
    return (
      // 由於 Card 是我們自定義的 Component，所以它本身並不會回應 onPress 事件。需要在 Card Component 裡面將由 TouchableOpacity 觸發的 onPress 事件傳到上一層。方法如下：
      <TouchableOpacity
        style={{...this.props.style}}
        //
        // Card.js 內 TouchableOpacity 的 onPress 事件指定到 this.props.onPress，調整如下：
        onPress={this.props.onPress}>
        <Text style={{fontSize: this.props.fontSize || 32}}>
          {/* 1. {this.props.title} */}
          {/* 1. Adding 'unclicked' type of button */}
          {this.props.isShow ? this.props.title : this.props.cover}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Card;
