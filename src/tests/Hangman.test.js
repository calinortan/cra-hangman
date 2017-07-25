import React from 'react';
import Hangman from '../components/Hangman';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

describe('<Hangman />', () => {
  it('renders without crashing', () => {
    shallow(<Hangman word='Calin' />);
  });

  it('allows us to set props', () => {
    const wrapper = mount(<Hangman word='CALINORTAN' />);
    expect(wrapper.props().word).toEqual('CALINORTAN');
    wrapper.setProps({ word: 'ALEXANDRA' });
    expect(wrapper.props().word).toEqual('ALEXANDRA');
  });

  it('should show end game', () => {
    const wrapper = mount(<Hangman word='CALIN' />);
    expect(wrapper.state().hp).toEqual(7);
    expect(wrapper.find('.Hangman').length).toEqual(1);
    wrapper.setState({ hp: -1 });
    expect(wrapper.find('.Hangman').length).toEqual(0);
    expect(wrapper.find('.Hangman-EndGame').length).toEqual(1);
  });
  it('should show Won game', () => {
    const wrapper = mount(<Hangman word='CALIN' />);
    expect(wrapper.find('.Hangman').length).toEqual(1);
    wrapper.setState({ guessedLetters: ['C','A','L','I','N'] });
    expect(wrapper.find('.Hangman').length).toEqual(0);    
    expect(wrapper.find('.Hangman-WonGame').length).toEqual(1);
  });
  describe('initial state', () => {
    it('sets guessedLetters', () => {
      const wrapper = mount(<Hangman word='CALIN' />);
      expect(wrapper.state().guessedLetters).toEqual(['C', 'N']);
    });

    it('sets inputLetter', () => {
      const wrapper = mount(<Hangman word='CALIN' />);
      expect(wrapper.state().inputLetter).toEqual('');
    });

    it('sets time', () => {
      const wrapper = mount(<Hangman word='CALIN' />);
      expect(wrapper.state().time).toEqual(0);
    });

    it('should sets hp', () => {
      const wrapper = mount(<Hangman word='CALIN' />);
      expect(wrapper.state().hp).toEqual(7);
    });
  })

  it('calls componentDidMount', () => {
    jest.spyOn(Hangman.prototype, 'componentDidMount');
    const wrapper = mount(<Hangman word='CALINORTAN' />);
    expect(Hangman.prototype.componentDidMount).toHaveBeenCalled();
    Hangman.prototype.componentDidMount.mockRestore();
  });
})