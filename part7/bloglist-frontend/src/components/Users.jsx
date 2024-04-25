import { useResource } from "./hooks/useResource"

const Users = () => {
    const [users, userServices] = useResource('/api/users')

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Created Blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => <tr key={u.id}>
                                        <td>{u.name}</td>
                                        <td>{u.blogs.length}</td>
                                    </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users