import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./ProfilePage.css"

export const ProfilePage = () => {
    const [user, setUsers] = useState([])
    const { id } = useParams()


    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${id}?_expand=profession`)
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
                    <header id="user_header"><b>{user.firstName}'s Details</b></header>
                    <section id="userDetails">
                    <div><b>Email:</b> {user.email}</div>
                    <div><b>Profession:</b> {user?.profession?.profession}</div>
                    <div><b>Link:</b> {user.linksToSite}</div>
                    <div><b>About {user.firstName}:</b> {user.about}</div>
                    <div><b>What Services {user.firstName} is Interest In:</b> {user.whatInterestedIn}</div>
                    <div><b>What Services {user.firstName} is Willing to Trade:</b> {user.whatWillingToTrade}</div>
                </section></section>


            }
        </article>
    </>
}