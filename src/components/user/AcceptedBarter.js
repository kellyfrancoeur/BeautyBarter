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
            fetch(`http://localhost:3000/barters`)
                .then(response => response.json())
                .then((barterArray) => {
                    setBarters(barterArray)
                })
        },
        []
    )

    const userBarters = () => {
        fetch(`http://localhost:3000/potentialBarters?_expand=user`)
                .then(response => response.json())
                .then((potentialBarterArray) => {
                    setPotentialBarters(potentialBarterArray)
                })
    }

    useEffect(
        () => {
            fetch(`http://localhost:3000/potentialBarters?_expand=user`)
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
        <header id="header"><b>Barter {barterObject.id} </b></header>
        <div><b><u>Service Requested:</u> {barterObject.serviceRequested}</b></div>
        <div><b><u>Details:</u> {barterObject.description1}</b></div>
        <div><b><u>Service Offered:</u> {barterObject.serviceOffered}</b></div>
        <div><b><u>Details:</u> {barterObject.description2}</b></div>
        <footer>
                {potentialBarters.map((potentialBarter) => {
                    if (potentialBarter.barterId === barterObject.id) {
                        
                        return (<>
                           <b>You've accepted the barter!</b>
                        </>
                        )}
                    }
               ) }
              
    </footer>
    </section >
}

