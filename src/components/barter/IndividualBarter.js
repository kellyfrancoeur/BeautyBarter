import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const IndividualBarter = ({ barterObject, getAllBarters }) => {

    const localBarterUser = localStorage.getItem("barter_user")
    const barterUserObject = JSON.parse(localBarterUser)


    return <section className="barter" key={`barter--${barterObject.id}`}>
        <header id="header"><b>Barter {barterObject.id}</b></header>
        <div><b>Service Requested:</b> {barterObject.serviceRequested}</div>
        <div><b>Details:</b> {barterObject.description1}</div>
        <div><b>Service Offered:</b> {barterObject.serviceOffered}</div>
        <div><b>Details:</b> {barterObject.description2}</div>
        <div>
            Posted by: <Link className="user_profile" to={`/userProfile/${barterObject.user.id}`}>{barterObject.user.firstName}</Link>
        </div>
        <footer>
            {
                barterObject.potentialBarters.length
                    ? "This Barter is Pending..."
                    : <button onClick={() => {
                        fetch(`http://localhost:8088/potentialBarters`, {
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
                    >Interested!</button>

            }
        </footer>
    </section>
}
