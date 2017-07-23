#react-introjs

A small React wrapper for Intro.js. Currently it only supports steps.

## Installation
```
npm install --save react-introjs
```
Don't forget install react and introjs as they are peer dependencies.

## Usage

Using InrojsProvider to wrap your application.
code example:

```js
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import { IntrojsProvider } from 'react-introjs';
import App from './components/App';
import store from './configureStore';

render(
  <IntrojsProvider
    onExit={() => console.log('exit')}
    onConfigureIntroJs={() => new Promise((resolve, reject) => {
      resolve([
        {
          element: '[introjs-step-id="step1"]',
          intro: 'test 1',
          position: 'right',
          tooltipClass: 'myTooltipClass',
          highlightClass: 'myHighlightClass',
        },
        {
          element: '[introjs-step-id="step2"]',
          intro: 'test 2',
        },
      ]);
    })}
  >
    <Provider store={store} >
      <App />
    </Provider>
  </IntrojsProvider>, document.getElementById('main'));
  ```
then using connectIntrojsStep to wrap the steps and connectIntrojsControl to get controls of Introjs method.
code example:
```js
import React from 'react';
import { Input } from 'semantic-ui-react';
import { connectIntrojsStep, connectIntrojsControl } from 'react-introjs';
import styles from './App.css';

const IntrojsStartButton = connectIntrojsControl((props) => {
  const { introjsStart, introjsIsConfigured } = props;
  return <button onClick={() => {
    if(introjsIsConfigured()) introjsStart()
  }} >introjs start</button>;
});

const App = (props) => {
  const IntrojsConnectedAtag = connectIntrojsStep('a', 'step1');
  const IntrojsConnectedInput = connectIntrojsStep(Input, 'step2');
  return (
    <div className={styles.container} >
      <IntrojsStartButton />
      <IntrojsConnectedAtag >test1</IntrojsConnectedAtag>

      <IntrojsConnectedInput
        placeholder="Search on title..." onChange={() => console.log('search')}
        className={styles.searchInput} />
    </div>
  );
};
export default App;
 ```
  
