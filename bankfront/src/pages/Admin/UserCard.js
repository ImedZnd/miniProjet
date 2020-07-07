import React from "react"


const UserCard = (props) => {
    return (
        <div>
            <div>
                <h2>{props.user.name}</h2>
            </div>
            <div>
                <h2>{props.user.role}</h2>
            </div>
            <div>
                <h2>{props.user._id}</h2>
            </div>
        </div>
    )
}

export default UserCard;