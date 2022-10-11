import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Register.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        professionId: 0,
        linksToSite: "",
        about: "",
        whatInterestedIn: "",
        whatWillingToTrade: ""

    })
    const [professions, setProfessions] = useState ([])
    let navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:3000/professions`)
                .then(response => response.json())
                .then((professionArray) => {
                    setProfessions(professionArray)
                })

        },
        []
    )
    const registerNewUser = () => {
        return fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("barter_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/home")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:3000/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        if(evt.target.id === "professionId"){
            copy[evt.target.id] = parseInt(evt.target.value)
        } else {
        copy[evt.target.id] = evt.target.value
        }
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }} className="container--login">
            <form className="form--login" onSubmit={handleRegister} autocomplete="off">
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Beauty Barter</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                        type="text" id="firstName" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser}
                        type="text" id="lastName" className="form-control"
                        placeholder="Enter your last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="text" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="profession">Profession:  </label>
                        <select id="professionId" 
                            onChange={updateUser}
                        >
                            <option value={0}>Select Profession</option>
                            {
                                professions.map(profession => {
                                    return <option value={profession.id}>{profession.profession}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor="linksToSite"> Professional Site </label>
                    <input onChange={updateUser}
                        type="linksToSite" id="linksToSite" className="form-control"
                        placeholder="Professional Site" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="about"> About </label>
                    <input onChange={updateUser}
                        type="about" id="about" className="form-control"
                        placeholder="Tell Us About Yourself" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="whatInterestedIn"> What Services Are You Interested In? </label>
                    <input onChange={updateUser}
                        type="whatInterestedIn" id="whatInterestedIn" className="form-control"
                        placeholder="List Some Services" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="whatWillingToTrade"> What Services Are You Willing to Trade? </label>
                    <input onChange={updateUser}
                        type="whatWillingToTrade" id="whatWillingToTrade" className="form-control"
                        placeholder="List Some Services You'd Trade" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> <b>Register</b> </button>
                </fieldset>
            </form>
        </main>
    )
}

