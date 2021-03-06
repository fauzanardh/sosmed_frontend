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
            <p>Message: {apiData.message} | Error Code: {apiData.error_code}</p>
            <p>Description: {apiData.data.description}</p>
        </div>
    );
}

export default APITest;
