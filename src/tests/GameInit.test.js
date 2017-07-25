import React from 'react';
import GameInit from '../components/GameInit';
import { shallow, mount } from 'enzyme';

describe('<GameInit />', () => {
  it('renders without crashing', () => {
    shallow(<GameInit />);
  });

  it('should render Hangman on submit', () => {
    const wrapper = mount(<GameInit />);
    wrapper.setState({ word: 'CALIN' });
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.state().isHangmanStarted).toEqual(true)
    expect(wrapper.find('.Hangman').length).toEqual(1)
  });
  describe('it should not render Hangman', () => {
    it('has less than 5 chars', () => {
      const wrapper = mount(<GameInit />);
      wrapper.setState({ word: 'CALI' });
      const form = wrapper.find('form').simulate('submit');
      expect(wrapper.state().isHangmanStarted).toEqual(false)
      expect(wrapper.find('.Hangman').length).toEqual(0)
    });
    it('has more than 15 chars', () => {
      const wrapper = mount(<GameInit />);
      wrapper.setState({ word: 'CALINORTANCALINORTAN' });
      const form = wrapper.find('form').simulate('submit');
      expect(wrapper.state().isHangmanStarted).toEqual(false)
      expect(wrapper.find('.Hangman').length).toEqual(0)
    });
    it('contains numbers', () => {
      const wrapper = mount(<GameInit />);
      wrapper.setState({ word: 'CALIN33' });
      const form = wrapper.find('form').simulate('submit');
      expect(wrapper.state().isHangmanStarted).toEqual(false)
      expect(wrapper.find('.Hangman').length).toEqual(0)
    });
  })
})