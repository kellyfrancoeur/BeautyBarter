import { useState } from "react"
import { UserSearch } from "./UserSearch"
import { CurrentUsers } from "./CurrentUsers"

export const UserContainer = () => {
    const [searchUserTerms, setUserSearchTerms] = useState("")
    return <>
        <UserSearch setterUserFunction={setUserSearchTerms} />
        <CurrentUsers searchUserTermState={searchUserTerms} />
    </>
}