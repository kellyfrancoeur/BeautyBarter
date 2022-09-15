import { useEffect, useState } from "react"


export const IndividualBarter = ({ barterObject, getAllBarters }) => {

    const localBarterUser = localStorage.getItem("barter_user")
    const barterUserObject = JSON.parse(localBarterUser)


    return <section className="barter" key={`barter--${barterObject.id}`}>
        <header>Barter {barterObject.id}</header>
        <div>Service Requested: {barterObject.serviceRequested}</div>
        <div>Details: {barterObject.description1}</div>
        <div>Service Offered: {barterObject.serviceOffered}</div>
        <div>Details: {barterObject.description2}</div>
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
