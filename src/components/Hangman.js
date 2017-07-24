import React, { Component } from 'react';

class Hangman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => {
        return {
          time: prevState.time + 1
        }
      })
    }, 1000)
  }
  componentDidUpdate() {
    const {time} = this.state;
    if (time === 4) {
      this.setState({
        time: 0
      });
    }
  }
  renderTimer() {
    return <div className='Hangman-Timer'>
      {this.state.time}
    </div>
  }

  renderWord() {
    const {word} = this.props;
    const chars = word.split('');
    return chars.map((c, index) => {
      return <div className='Hangman-Word-Letter' key={index}>
        {c}
      </div>
    })
    // return <div className='Hangman-Word'>
    //   {this.renderLetter('C')}
    //   {this.renderLetter('*')}
    //   {this.renderLetter('*')}
    //   {this.renderLetter('*')}
    //   {this.renderLetter('N')}      
    // </div>
  }
  render() {
    return (
      <div className="Hangman">
        {this.renderTimer()}
        <div className='Hangman-Word'>
          {this.renderWord()}
        </div>
      </div>
    );
  }
}

export default Hangman;
