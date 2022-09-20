import { useState } from "react"
import { BarterList } from "./BarterList"
import { BarterSearch } from "./BarterSearch"


export const BarterContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    return <>
        <BarterSearch setterFunction={setSearchTerms} />
        <BarterList searchTermState={searchTerms} />
    </>
}
