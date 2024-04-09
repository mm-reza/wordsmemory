
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MyQuiz from './components/Quiz';

test('renders English and French words correctly', () => {

  const { getByText } = render(<MyQuiz />);


  expect(getByText('Forest')).toBeInTheDocument();
  expect(getByText('Slibling')).toBeInTheDocument();

  expect(screen.queryByText('Quiz Result')).not.toBeInTheDocument();


});


test('allows submitting the quiz', () => {
  const { getByText } = render(<MyQuiz />);

  // Simulate clicking the submit button
  fireEvent.click(getByText('Submit'));

  expect(getByText('Quiz Result')).toBeInTheDocument();

});

