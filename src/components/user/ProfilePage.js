import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const ProfilePage = () => {
    const [user, setUsers] = useState([])
    const { id } = useParams()
    

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
            .then((userData) => {
                setUsers(userData)
            })
    },
    [id]
)



    return <>
        
        <article className="users" >
            {
               
                      <section className="user" key={`user--${user.id}`}>
                            <h2> {user.firstName} {user.lastName} </h2>
                            <div>Email: {user.email}</div>
                            {/* <div>Profession: {user.professionId.profession}</div> */}
                            <div>Link: {user.linksToSite}</div>
                            <div>About {user.firstName}: {user.about}</div>
                            <div>What Services {user.firstName} is Interest In: {user.whatInterestedIn}</div>
                            <div>What Services {user.firstName} is Willing to Trade: {user.whatWillingToTrade}</div>
                        </section>
                    
                
            }
        </article>
    </>
}