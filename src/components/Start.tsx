import * as React from 'react';
import './Start.css';
// import { Logging } from 'adal-node';

const logo = require('../logo.svg');

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    user?:any;
}

function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement, user }: Props) {
  if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }

  return (
    <div className="hello">
        <h2>Welcome to React</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">To get started, edit <code>src/App.tsx</code> and save to reload.</p>
        <div className="greeting"> 
            Hello {_getName(user) + getExclamationMarks(enthusiasmLevel)}
        </div>
        <div>
            <button onClick={onDecrement}>-</button>
            <button onClick={onIncrement}>+</button>
        </div>
    </div>
  );
}

function _getName(pUser:any){
    let _name:string = 'NOT LOGGED IN';
    
    if(window.authContext){
        pUser = window.authContext.getCachedUser();
        _name = 'authContext is not null';
        if(pUser){
            _name = pUser.profile.name;
        }
    }
    return _name;
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
