import "./UserSearch.css"

export const UserSearch = ({ setterUserFunction }) => {
    return (
        <div id="userWrap">
            <form action="" autocomplete="off">
                <input id="userSearch" name="userSearch"
                    onChange={
                        (changeEvent) => {
                            setterUserFunction(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="What type of profession are you looking for?"/><input id="search_submit" value="Rechercher" type="submit" />
                    </form>
                </div>
                )
}