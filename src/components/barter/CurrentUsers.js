import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./CurrentUser.css"


export const CurrentUsers = ({ searchUserTermState }) => {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    
    useEffect(
        () => {
            const searchedUsers = users.filter(user => {
                return user?.profession?.profession.toLowerCase().startsWith(searchUserTermState.toLowerCase()) })
            setFilteredUsers(searchedUsers)
        },
        [searchUserTermState]
    )
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/users?_expand=profession`)
                .then(res => res.json())
                .then((usersArray) => {
                    setUsers(usersArray)
                    setFilteredUsers(usersArray)
                })
        },
        []
    )



    return <> 
    <main className = "container--about">
    <h2 id="members"><u>Members</u></h2>
    <article className="users_List" >
        {
            filteredUsers.map(
                (user) => {
                    return <section className="userList" key={`user--${user.id}`}>
                       <div> <Link id="userName" to={`/userProfile/${user.id}`}>{user.firstName} {user.lastName}</Link></div>
                        <img id ="logo"src={user?.profession?.logo} height="100" width="100" border="2px solid black"/>
                        </section>
                } 
            )
        }
    </article></main> </>
}

   