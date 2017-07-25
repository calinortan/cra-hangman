import React, { Component } from 'react';
import difference from 'lodash.difference';
import isEmpty from 'lodash.isempty';


class Hangman extends Component {
  constructor(props) {
    super(props);
    const guessedLetters = [];
    const { word } = this.props;
    guessedLetters.push(word.charAt(0));
    guessedLetters.push(word.slice(-1));
    this.state = {
      time: 0,
      guessedLetters,
      inputLetter: '',
      hp: 7,
      showError: false,
    }
  }
  componentDidMount() {
    this.setIntervalId = setInterval(() => {
      this.setState((prevState) => {
        return {
          time: prevState.time + 1
        }
      })
    }, 1000)
  }
  componentDidUpdate() {
    const { time, hp } = this.state;
    if (time > 30) {
      this.setState({
        time: 0,
        hp: hp - 1
      });
    }
  }
  renderTimer() {
    return <div className='Hangman-Timer'>
      {this.state.time}
    </div>
  }

  componentWillUnmount() {
    clearInterval(this.setIntervalId)
  }

  renderWord() {
    const { word } = this.props;
    const { guessedLetters } = this.state;

    const chars = word.split('');
    return chars.map((c, index) => {
      const char = guessedLetters.includes(c) ? c : '*';
      return <div className='Hangman-Word-Letter' key={index}>
        {char}
      </div>
    })
  }

  showErrorMessage() {
    this.setState({ showError: true, showCorrect: false });

    setTimeout(() => {
      this.setState({ showError: false })
    }, 3000)
  }

  showCorrectMessage() {
    this.setState({ showCorrect: true, showError: false });

    setTimeout(() => {
      this.setState({ showCorrect: false })
    }, 3000)
  }

  onLetterSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    const { guessedLetters, inputLetter, hp } = this.state;
    const { word } = this.props;

    const isCorrect = word.includes(inputLetter)
    this.setState({
      guessedLetters: guessedLetters.concat(inputLetter),
      time: 0,
      hp: isCorrect ? hp : hp - 1,
      inputLetter: ''
    })

    isCorrect ? this.showCorrectMessage() : this.showErrorMessage()
  }

  handleInputChange = (event) => {
    this.setState({
      inputLetter: event.target.value.toUpperCase()
    });
  }

  renderEndGame() {
    return <div className='Hangman-EndGame'>
      <span>
        You Got HANGED !!!!
      </span>
      <div>
        <button onClick={this.props.onReset}>RESTART Game</button>
      </div>
      <div>
        <img src='/hangman.jpg' />
      </div>
    </div>
  }

  renderWonGame() {
    return <div className='Hangman-WonGame'>
      <span>
        Congratulations YOU ESCAPED THE HANGMAN !!!!
      </span>
      <div>
        <button onClick={this.props.onReset}>RESTART Game</button>
      </div>
      <div>
        <img src='/congratulations.jpg' />
      </div>
    </div>
  }

  renderRemainingHp() {
    return <div className='Hangman-HealthPoints'>
      Health Points Remaining: <span className='Hangman-HealthPoints-HpNumber'>{this.state.hp}</span>
    </div>
  }

  renderMessage() {
    const { showCorrect, showError } = this.state;
    if (showCorrect) {
      return <div className='Hangman-Message-Correct'>
        CORRECT !!!
      </div>
    }
    if (showError) {
      return <div className='Hangman-Message-Error'>
        WRONG.... :(
      </div>
    }
  }

  renderInputLetter() {
    return <div className='Hangman-InputLetter'>
      <div>Guess a letter here and press enter to submit:</div>
      <form onSubmit={this.onLetterSubmit}>
        <input maxLength="1" value={this.state.inputLetter} onChange={this.handleInputChange} />
      </form>
    </div>
  }
  render() {
    const { hp, guessedLetters } = this.state;
    const { word } = this.props;

    if (hp < 0) {
      return this.renderEndGame();
    }
    if (isEmpty(difference(word.split(''), guessedLetters))) {
      return this.renderWonGame();
    }

    return (
      <div className="Hangman">
        <div>You have 30 seconds to guess a letter</div>
        {this.renderTimer()}
        <div className='Hangman-Word'>
          {this.renderWord()}
        </div>
        {this.renderInputLetter()}
        {this.renderRemainingHp()}
        <div className='Hangman-Message'>
          {this.renderMessage()}
        </div>
      </div>
    );
  }
}

export default Hangman;
