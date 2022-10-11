import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const BarterEdit = () => {
    const [services, setServices] = useState([])
    const [barter, assignBarter] = useState({
        serviceRequested: 0,
        description1: "",
        serviceOffered: 0,
        description2: ""
    })
    const { barterId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:3000/services`)
                .then(response => response.json())
                .then((serviceArray) => {
                    setServices(serviceArray)
                })

        },
        []
    )

    useEffect(() => {
        fetch(`http://localhost:3000/barters/${barterId}`)
            .then(response => response.json())
            .then((data) => {
                assignBarter(data)
            })
    }, [barterId])

    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:3000/barters/${barter.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(barter)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/profile")
            })
    }


    return <form className="barterForm">
        <h2 className="barterForm__title">Post A Barter</h2>
        <h3 id="barterForm_details">Select the service you'd like to receive and what you are willing to trade in return. Add a few details to let other users know exactly what you're looking for!</h3>
        <div className="wholeBarterForm">
        <fieldset>
            <div className="form-group">
                <label htmlFor="description"><b>Service Requested: </b> </label>
                <select id="serviceRequested" value={barter.serviceRequested}
                    onChange={(evt) => {
                        const copy = { ...barter }
                        copy.serviceRequested = evt.target.value
                        assignBarter(copy)
                    }}
                >
                    <option value={0}>Select Service</option>
                    {
                        services.map(service => {
                            return <option value={service.service}>{service.service}</option>
                        })
                    }
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description1"><b>Details:</b></label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Details of Requested Service"
                    value={barter.description1}
                    onChange={
                        (evt) => {
                            const copy = { ...barter }
                            copy.description1 = evt.target.value
                            assignBarter(copy)
                        }

                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="serviceOffered"><b>Service Offered: </b> </label>
                <select id="serviceOffered" value={barter.serviceOffered}
                    onChange={(evt) => {
                        const copy = { ...barter }
                        copy.serviceOffered = evt.target.value
                        assignBarter(copy)
                    }}
                >
                    <option value={0}>Select Service</option>
                    {
                        services.map(service => {
                            return <option value={service.service}>{service.service}</option>
                        })
                    }
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description2"><b>Details:</b></label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Details of Service Offered"
                    value={barter.description2}
                    onChange={
                        (evt) => {
                            const copy = { ...barter }
                            copy.description2 = evt.target.value
                            assignBarter(copy)
                        }

                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            <b>Save Changes</b>
        </button>
        </div>
    </form>
}