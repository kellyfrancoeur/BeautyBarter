import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./PendingBarter.css"


export const PendingBarters = ({ barterObject, potentialBarters, setPotentialBarters }) => {
    const [barters, setBarters] = useState([])
    const [filteredBarters, setFiltered] = useState([])

    const localBarterUser = localStorage.getItem("barter_user")
    const barterUserObject = JSON.parse(localBarterUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/barters`)
                .then(response => response.json())
                .then((barterArray) => {
                    setBarters(barterArray)
                })
        },
        []
    )

    const userBarters = () => {
        fetch(`http://localhost:8088/potentialBarters?_expand=user`)
            .then(response => response.json())
            .then((potentialBarterArray) => {
                setPotentialBarters(potentialBarterArray)
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/potentialBarters?_expand=user`)
                .then(response => response.json())
                .then((potentialBarterArray) => {
                    setPotentialBarters(potentialBarterArray)
                })
        },
        []
    )

    const userExpressedInterest = () => {
        if (localBarterUser) {
            const myBarters = barters.filter(barter => barter.userId === barterUserObject.id)
            setFiltered(myBarters)
        }
    }


    useEffect(
        () => {
            userExpressedInterest()
        },
        [barters]
    )

    return <section className="barter" key={`barter--${barterObject.id}`}>
        <header id= "header">
            <Link to={`/barters/${barterObject.id}/edit`}><b>Barter {barterObject.id}</b></Link>
        </header>
        <div><b><u>Service Requested:</u> {barterObject.serviceRequested}</b></div>
        <div><b><u>Details:</u> {barterObject.description1}</b></div>
        <div><b><u>Service Offered:</u> {barterObject.serviceOffered}</b></div>
        <div><b><u>Details:</u> {barterObject.description2}</b></div>
        <footer>
            {potentialBarters.map((potentialBarter) => {
                if (potentialBarter.barterId === barterObject.id) {
                    return (<>
                        <b>Pending Barter: <Link id="userName" to={`/userProfile/${potentialBarter.user.id}`}>{potentialBarter.user.firstName}</Link> is interested in your trade.</b>
                        <div>
                            < button onClick={() => {
                                fetch(`http://localhost:8088/potentialBarters/${potentialBarter.id}`, {
                                    method: "DELETE"
                                })
                                    .then(response => response.json())
                                    .then(() => {
                                        userBarters(potentialBarters)
                                    }
                                    )
                            }} className="barter_deny"><b> Deny</b> </button>
                            <button onClick={() => {
                                fetch(`http://localhost:8088/potentialBarters/${potentialBarter.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        userId: barterUserObject.id,
                                        barterId: potentialBarter.barterId,
                                        accepted: true,
                                        dateAccepted: new Date()
                                    })
                                })
                                    .then(response => response.json())
                                    .then(() => {
                                    
                                        fetch(`http://localhost:8088/potentialBarters/${potentialBarter.id}`)
                                            .then(response => response.json())
                                            .then(() => {
                                                userBarters(potentialBarters)
                                            }
                                            )
                                    })}
                            }

                             className= "barter_accept" ><b>Accept</b></button>
                        </div></>
                    )
                }
            }
            )}

        </footer>
    </section >
}

