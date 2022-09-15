import { useEffect, useState } from "react"
import { PendingBarters } from "./PendingBarters"


export const ProfileHome = () => {
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

    const myPotentialBarters = () => {
        if (localBarterUser) {
            const myBarters = barters.filter(barter => barter.userId === barterUserObject.id)
            setFiltered(myBarters)
        }
    }



    useEffect(
        () => {
            myPotentialBarters()
        },
        [barters]
    )

    


    return <>
        <h2> My Pending Barters</h2>
        <article className="barters" >
            {
                filteredBarters.map(
                    (barter) => <PendingBarters
                        barterObject = {barter}/>

                    
                )}           
        </article>
        <h2> My Accepted Barters</h2>
    </>
}
