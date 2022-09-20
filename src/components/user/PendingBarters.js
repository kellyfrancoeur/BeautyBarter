import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


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
        <div><b>Service Requested:</b> {barterObject.serviceRequested}</div>
        <div><b>Details:</b> {barterObject.description1}</div>
        <div><b>Service Offered:</b> {barterObject.serviceOffered}</div>
        <div><b>Details:</b> {barterObject.description2}</div>
        <footer>
            {potentialBarters.map((potentialBarter) => {
                if (potentialBarter.barterId === barterObject.id) {
                    return (<>
                        Pending Barter: {potentialBarter.user.firstName} is interested in your trade.
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
                            }} className="barter_deny"> Deny </button>
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

                             className= "barter_accept" >Accept</button>
                        </div></>
                    )
                }
            }
            )}

        </footer>
    </section >
}

