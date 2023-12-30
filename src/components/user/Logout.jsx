import React, { useEffect } from 'react'

export default function Logout(props) {
    // logout whenever this component is rednered / called
    useEffect(() => {
        props.logout();
    }, []);
    return (
        <div>Logging out</div>
    )
}
