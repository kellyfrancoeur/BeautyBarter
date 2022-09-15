import { useEffect, useState } from "react"
import { IndividualBarter } from "./IndividualBarter"

export const BarterList = () => {
    const [barters, setBarters] = useState([])
    

    const getAllBarters = () => {
        fetch(`http://localhost:8088/barters?_embed=potentialBarters`)
            .then(response => response.json())
            .then((barterArray) => {
                setBarters(barterArray)
            })

    }


    useEffect(
        () => {
            getAllBarters()
        },
        []
    )

    return <>
        <h2> Available Barters</h2>
        <article className="barters" >
            {
                barters.map(
                    (barter) => <IndividualBarter 
                    barterObject={barter}
                    getAllBarters={getAllBarters} />

                )
            }
        </article>
    </>

}
