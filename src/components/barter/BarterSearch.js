import "./BarterSearch.css"

export const BarterSearch = ({ setterFunction }) => {
    return (
        <div id="wrap">
            <form action="" autocomplete="on">
                <input id="search" name="search"
                    onChange={
                        (changeEvent) => {
                            setterFunction(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="What type of service are you looking for?"/><input id="search_submit" value="Rechercher" type="submit" />
                    </form>
                </div>
                )
}

                {/* <div id="searchBar">
        <input
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Enter search terms" />
            </div> */}