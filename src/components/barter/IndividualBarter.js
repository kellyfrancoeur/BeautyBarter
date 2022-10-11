import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const IndividualBarter = ({ barterObject, getAllBarters }) => {

    const localBarterUser = localStorage.getItem("barter_user")
    const barterUserObject = JSON.parse(localBarterUser)


    return <section className="barter" key={`barter--${barterObject.id}`}>
        <header id="header"><b>Barter Request</b></header>
        <div><b><u>Service Requested:</u> {barterObject.serviceRequested}</b></div>
        <div><b><u>Details:</u> {barterObject.description1}</b></div>
        <div><b><u>Service Offered:</u> {barterObject.serviceOffered}</b></div>
        <div><b><u>Details:</u> {barterObject.description2}</b></div>
        <div>
            <b>Posted by: <Link className="user_profile" to={`/userProfile/${barterObject.user.id}`}>{barterObject.user.firstName}</Link></b>
        </div>
        <footer>
            {
                barterObject.potentialBarters.length
                    ? <b>"This Barter is Pending..."</b>
                    : <button onClick={() => {
                        fetch(`http://localhost:3000/potentialBarters`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                userId: barterUserObject.id,
                                barterId: barterObject.id,
                                accepted: false,
                                dateAccepted: ""
                            })
                        })
                            .then(response => response.json())
                            .then(() => {
                                getAllBarters()
                            })
                    }}
                    ><b>Interested!</b></button>

            }
        </footer>
    </section>
}
