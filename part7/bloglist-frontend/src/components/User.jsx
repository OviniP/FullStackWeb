import { useResource } from "../hooks/useResource"

const User = (id) => {
    console.log(id)
    if(id === null)
        return null 

    return (
        <div>User</div>
    )
}

export default User