import React from 'react';

const APITest = (props) => {
    const { apiData } = props;
    if (!apiData) {
        return (
            <div className='API-Result'>
                Waiting for the API server response...
            </div>
        );
    }
    return (
        <div className='API-Result'>
            <p>Status: {apiData.status} | Error Code: {apiData.error_code}</p>
            <p>Description: {apiData.data[0].description}</p>
        </div>
    );
}

export default APITest;
