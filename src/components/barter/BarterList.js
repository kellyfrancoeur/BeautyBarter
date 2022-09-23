import { useEffect, useState } from "react"
import { BarterSearch } from "./BarterSearch"
import { IndividualBarter } from "./IndividualBarter"
import "./BarterList.css"

export const BarterList = ({ searchTermState }) => {
    const [barters, setBarters] = useState([])
    const [filteredBarters, setFiltered] = useState([])
     

    useEffect(
        () => {
            const searchedBarters = barters.filter(barter => {
                return barter.serviceRequested.toLowerCase().includes(searchTermState.toLowerCase()) 
                || barter.serviceOffered.toLowerCase().includes(searchTermState.toLowerCase()) })
            setFiltered(searchedBarters)
        },
        [searchTermState]
    )



    const getAllBarters = () => {
        fetch(`http://localhost:8088/barters?_embed=potentialBarters&_expand=user`)
            .then(response => response.json())
            .then((barterArray) => {
                setFiltered(barterArray)
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
        <h2> <u>Available Barters</u></h2>
        <article className="barters" >
            {
                filteredBarters.map(
                    (barter) => <IndividualBarter
                        barterObject={barter}
                        getAllBarters={getAllBarters} />

                )
            } 
        </article>
    </>

}
