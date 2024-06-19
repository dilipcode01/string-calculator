import React from 'react';
import { render, screen } from '@testing-library/react';
import StringCalculator, { add } from './StringCalculator';

describe('StringCalculator', () => {
  test('renders the component', () => {
    render(<StringCalculator />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  test('should return 0 for an empty string', () => {
    expect(add('')).toBe(0);
  });

  test('should return the number for a single number string', () => {
    expect(add('1')).toBe(1);
  });

  test('should return the sum of two numbers separated by a comma', () => {
    expect(add('1,2')).toBe(3);
  });

  test('should return the sum of an unknown amount of numbers', () => {
    expect(add('1,2,3,4,5')).toBe(15);
  });

  test('should handle new lines between numbers', () => {
    expect(add('1\n2,3')).toBe(6);
  });

  test('should support custom delimiters', () => {
    expect(add('//;\n1;2')).toBe(3);
  });

  test('should throw an exception when a negative number is provided', () => {
    expect(() => add('-1')).toThrow('negatives not allowed -1');
  });

  test('should throw an exception with all negative numbers when multiple negatives are provided', () => {
    expect(() => add('1,-2,-3')).toThrow('negatives not allowed -2,-3');
  });

  test('should ignore numbers greater than 1000', () => {
    expect(add('1,2,1001')).toBe(3);
  });

  test('should support delimiters of any length', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
  });

  test('should support multiple delimiters', () => {
    expect(add('//[*][%]\n1*2%3')).toBe(6);
  });

  test('should support multiple delimiters with length longer than one char', () => {
    expect(add('//[**][%%]\n1**2%%3')).toBe(6);
  });
});
