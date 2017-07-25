import React, { Component } from 'react';
import Hangman from './Hangman';

class GameInit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      isHangmanStarted: false
    }
  }
  handleInputChange = (event) => {
    this.setState({
      word: event.target.value.toUpperCase()
    });
  }

  handleWordSubmit = (event) => {
    event.preventDefault()
    const { word } = this.state
    const shouldShowError = word.length < 5 || word.length > 15 || !/^[a-z]+$/i.test(word);
    if (shouldShowError) {
      this.showErrorMessage()
    } else {
      this.setState({
        isHangmanStarted: true
      })
    }
  }

  showErrorMessage() {
    this.setState({ showError: true });

    setTimeout(() => {
      this.setState({ showError: false })
    }, 3000)
  }
  renderInit() {
    if (this.state.isHangmanStarted) {
      return null;
    }
    return <div className='GameInit'>
      <div>Submit a word having between 5 and 15 letters:</div>
      <form onSubmit={this.handleWordSubmit}>
        <input maxLength="15" value={this.state.word} onChange={this.handleInputChange} className='GameInit-Input' />
        <input type='submit' className='GameInit-Submit' />
      </form>
    </div>
  }

  renderHangman() {
    if (this.state.isHangmanStarted) {
      return <Hangman word={this.state.word} onReset={this.onReset}/>;
    }
  }

  onReset = () => {
    this.setState({
      isHangmanStarted: false,
      word: ''
    })
  }

  renderErrorMsg() {
    if (!this.state.showError) {
      return null;
    }
    return <div className='GameInit-Error'>
      Word should have between 5 and 15 chars and only contain letters
      </div>
  }
  render() {
    return <div>
      {this.renderInit()}
      {this.renderHangman()}
      {this.renderErrorMsg()}
    </div>
  }
}

export default GameInit;
