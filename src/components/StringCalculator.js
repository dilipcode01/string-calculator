import React, { useState } from 'react';

export const add = (numbers) => {
  let delimiter = ',';
  let numbersToAdd = numbers;

  if (numbers.startsWith('//')) {
    const delimiterEndIndex = numbers.indexOf('\n');
    let delimiters = numbers.slice(2, delimiterEndIndex);

    if (delimiters.startsWith('[') && delimiters.endsWith(']')) {
      delimiters = delimiters.slice(1, -1).split('][');
      delimiter = new RegExp(delimiters.map(d => escapeRegExp(d)).join('|'));
    } else {
      delimiter = new RegExp(escapeRegExp(delimiters));
    }

    numbersToAdd = numbers.slice(delimiterEndIndex + 1);
  }

  if (numbersToAdd === '') {
    return 0;
  }

  const nums = numbersToAdd
    .split(new RegExp(`[${escapeRegExp(String(delimiter))}\\n]`))
    .map(Number)
    .filter(num => num <= 1000);

  const negatives = nums.filter(num => num < 0);

  if (negatives.length > 0) {
    throw new Error(`negatives not allowed ${negatives.join(',')}`);
  }

  return nums.reduce((sum, num) => sum + num, 0);
};

const escapeRegExp = (str) => {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

const StringCalculator = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState();
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError('');
  };

  const handleCalculate = () => {
    try {
      const sum = add(inputValue);
      setResult(sum);
    } catch (e) {
      setError(e.message);
      setResult(0);
    }
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleCalculate}>Calculate</button>
      {error && <p>{error}</p>}
      <p>Result: {result}</p>
    </div>
  );
};

export default StringCalculator;
