import React from 'react';

function waitLoading(Component) {
    return function WihLoadingComponent({isLoading, ...props}) {
        if (!isLoading) return (
            <Component {...props}/>
        )
        return (
            <p>Waiting until the fetching is finished.</p>
        )
    }
}

export default waitLoading;
