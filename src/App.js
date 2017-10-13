import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';

class App extends Component {

    render() {

        return (
            <div className='app'>

                <Navbar />

                {this.props.children}

            </div>


        );
    }

}

export default App;