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
            fetch(`http://localhost:8088/barters`)
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
            fetch(`http://localhost:8088/potentialBarters?_expand=user`)
                .then(response => response.json())
                .then((potentialBartersArray) => {
                    setPotentialBarters(potentialBartersArray)
                })
        },
        []
    )

//do I need an onChange?
    return <>
        <h2>Welcome Back {barterUserObject.firstName}!</h2>
        <h3> My Pending Barters</h3>
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
                 <h3> My Accepted Barters</h3>
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

// return <>
//         <h2> My Pending Barters</h2>
//         <article className="barters" >
//             {
//                 filteredBarters.map((barter) => {
//                     const acceptedFalse = potentialBarters.find (({barterId}) => barterId === barter.id)
//                     if (barterUserObject.id === potentialBarters.userId && potentialBarters.accepted === false){
//                         return  <PendingBarters
//                             barterObject = {barter}
//                             pendingBarter = {acceptedFalse}/>
//                     })
//             <h2> My Accepted Barters</h2>
//                     <article className="barters" >
//                         {
//                             filteredBarters.map((barter) => {
//                                 const acceptedTrue = potentialBarters.find (({barterId}) => barterId === barter.id)
//                                 if (barterUserObject.id === potentialBarters.userId && potentialBarters.accepted === true){
//                                     return  <AcceptedBarters
//                                         barterObject = {barter}
//                                         pendingBarter = {acceptedTrue}/>
//                                 }}
                                
//                                 )}
//                     </article>
                
//                     </>
                

