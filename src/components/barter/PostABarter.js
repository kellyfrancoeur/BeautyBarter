import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./PostABarter.css"

export const BarterForm = () => {
    const [services, setServices] = useState([])
    const [barter, update] = useState({
        serviceRequested: 0,
        description1: "",
        serviceOffered: 0,
        description2: ""

    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/services`)
                .then(response => response.json())
                .then((serviceArray) => {
                    setServices(serviceArray)
                })

        },
        []
    )
    const navigate = useNavigate()
    const localBarterUser = localStorage.getItem("barter_user")
    const barterUserObject = JSON.parse(localBarterUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const barterToSendToAPI = {
            userId: barterUserObject.id,
            datePosted: new Date(),
            serviceRequested: barter.serviceRequested,
            description1: barter.description1,
            serviceOffered: barter.serviceOffered,
            description2: barter.description2
        }
        return fetch(`http://localhost:8088/barters`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(barterToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/viewBarter")
            }
            )
    }
    return (
        <form className="barterForm">
            <h2 className="barterForm__title"><u>Post A Barter</u></h2>
            <h3 id="barterForm_details">Select the service you'd like to receive and what you are willing to trade in return. Add a few details to let other users know exactly what you're looking for!</h3>
            <div className="wholeBarterForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description"><b>Service Requested:  </b></label>
                    <select id="serviceRequested" value={barter.serviceRequested}
                        onChange={(evt) => {
                            const copy = { ...barter }
                            copy.serviceRequested = evt.target.value
                            update(copy)
                        }}
                    >
                        <option value={0}><b>Select Service</b></option>
                        {
                            services.map(service => {
                                return <option value={service.service}><b>{service.service}</b></option>
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
                                update(copy)
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
                            update(copy)
                        }}
                    >
                        <option value={0}><b>Select Service</b></option>
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
                                update(copy)
                            }

                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                <b>Submit Barter</b>
            </button>
            </div>
        </form>
    )
}