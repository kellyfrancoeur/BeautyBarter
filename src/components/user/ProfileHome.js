import { useEffect, useState } from "react"
import { AcceptedBarters } from "./AcceptedBarter"
import { PendingBarters } from "./PendingBarters"


export const ProfileHome = () => {
    const [barters, setBarters] = useState([])
    const [filteredBarters, setFiltered] = useState([])
    const [potentialBarters, setPotentialBarters] = useState([])
    

    const localBarterUser = localStorage.getItem("barter_user")
    const barterUserObject = JSON.parse(localBarterUser)

    useEffect(
        () => {
            fetch(`http://localhost:3000/barters?_expand=user`)
                .then(response => response.json())
                .then((barterArray) => {
                    setBarters(barterArray)
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

    useEffect(
        () => {
            fetch(`http://localhost:3000/potentialBarters?_expand=user`)
                .then(response => response.json())
                .then((potentialBartersArray) => {
                    setPotentialBarters(potentialBartersArray)
                })
        },
        []
    )

    return <>
        <h2>Welcome Back {barterUserObject.firstName}!</h2>
        <h3><u>My Pending Barters</u></h3>
        <article className="barters">
            {
                filteredBarters.map((barter) => {
                    const whichList = potentialBarters.find ((potentialBarter) => potentialBarter.barterId === barter.id && potentialBarter.accepted === true)
                    if (!whichList){
                        return  <PendingBarters
                            barterObject = {barter}
                            potentialBarters = {potentialBarters}
                            setPotentialBarters = {setPotentialBarters}
                            />
                    } 
                }  
                )} 
                 <h3> <u>My Accepted Barters</u></h3>
                 {filteredBarters.map((barter) => {
                    const whichList = potentialBarters.find ((potentialBarter) => potentialBarter.barterId === barter.id && potentialBarter.accepted === true)
                    if (whichList){
                    return <AcceptedBarters
                    barterObject={barter}/>
                }}   
            )} 
                     
        </article>
      
    </>
}


