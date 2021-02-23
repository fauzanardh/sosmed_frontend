import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import API from './component/API'
import waitLoading from './component/waitLoading'

function App() {
    const ComponentLoading = waitLoading(API);
    const [appState, setAppState] = useState({
        loading: false,
        data: null,
    })

    useEffect(() => {
        setAppState({loading: false, data: null});
        const apiUrl = "/api/v1/test";
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setAppState({loading: false, data: data});
            });
    }, [setAppState]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Sosmed Frontend</p>
                <div className='API'>
                    <ComponentLoading isLoading={appState.loading} apiData={appState.data}/>
                </div>
            </header>
        </div>
    );
}

export default App;
