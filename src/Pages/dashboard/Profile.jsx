import React from 'react'

export default function Profile(props) {
  return (
    <div>
        <h1>
            Welcome back {props.userData.firstName} {props.userData.lastName}!
        </h1>
    </div>
    )
}
