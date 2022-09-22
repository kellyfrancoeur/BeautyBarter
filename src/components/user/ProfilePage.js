import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./ProfilePage.css"

export const ProfilePage = () => {
    const [user, setUsers] = useState([])
    const [userImages, setUserImages] = useState([])
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

    useEffect(
        () => {
            fetch(`http://localhost:8088/userImages?userId=${id}`)
                .then(res => res.json())
                .then((userImagesArray) => {
                    setUserImages(userImagesArray)
                })
        },
        []
    )




    return <>

        <article className="users" >
            {

                <section className="user" key={`user--${user.id}`}>
                    <h2><u>{user.firstName} {user.lastName}</u> </h2>
                    <div className="logo"><img src={user?.profession?.logo} height="150" width="150" border="2px solid black"/></div>
                    <div className="flex-container">
                    <section className="userDeets">
                    <header id="user_header"><b>{user.firstName}'s Details</b></header>
                    <div id="userDetails">
                        <div><b><u>Email:</u> {user.email}</b></div>
                        <div><b><u>Profession:</u> {user?.profession?.profession}</b></div>
                        <div><b><u>Link:</u> {user.linksToSite}</b></div>
                        <div><b><u>About {user.firstName}:</u> {user.about}</b></div>
                        <div><b><u>What Services {user.firstName} is Interest In:</u> {user.whatInterestedIn}</b></div>
                        <div><b><u>What Services {user.firstName} is Willing to Trade:</u> {user.whatWillingToTrade}</b></div>
                    </div></section>
                    {
                        userImages.map(
                            (userImage) => {
                                if (userImage.userId === user.id) {
                                    return <section className="userPictures">
                                        <header id="user_portfolio"><b className="portfolioText">{user.firstName}'s Portfolio</b></header>
                                        <section id="userPics">
                                        <div className="row">
                                            <div className="column">
                                        <img id="portfolioPictures" src={userImage.image1} height="235" width="330" />
                                        <img id="portfolioPictures" src={userImage.image2} height="235" width="330" />
                                        <img id="portfolioPictures" src={userImage.image3} height="235" width="330" />
                                        </div><div className="column">
                                        <img id="portfolioPictures" src={userImage.image4} height="235" width="330" />
                                        <img id="portfolioPictures" src={userImage.image5} height="235" width="330" />
                                        <img id="portfolioPictures" src={userImage.image6} height="235" width="330" />
                                        </div>
                                        </div>
                                        </section>
                                    </section>
                                }
                            }
                        )
                    }
                    </div>
                </section>


            }
        </article>
    </>
}
