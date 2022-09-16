import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const AcceptedBarters = ({ barterObject }) => {
    const [potentialBarters, setPotentialBarters] = useState([])
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

    return <section className="barter" key={`barter--${barterObject.id}` }>
        <header>Barter {barterObject.id} </header>
        <div>Service Requested: {barterObject.serviceRequested}</div>
        <div>Details: {barterObject.description1}</div>
        <div>Service Offered: {barterObject.serviceOffered}</div>
        <div>Details: {barterObject.description2}</div>
        <footer>
                {potentialBarters.map((potentialBarter) => {
                    if (potentialBarter.barterId === barterObject.id) {
                        
                        return (<>
                            Accepted Barter: You will be trading services with {potentialBarter.user.firstName}!
                        </>
                        )}
                    }
               ) }
              
    </footer>
    </section >
}

