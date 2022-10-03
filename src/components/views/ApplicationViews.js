import { Outlet, Route, Routes } from "react-router-dom"
import { AboutSection } from "../barter/AboutSection"
import { BarterContainer } from "../barter/BarterContainer"
import { BarterEdit } from "../barter/BarterEdit"
import { BarterList } from "../barter/BarterList"
import { CurrentUsers } from "../barter/CurrentUsers"
import { BarterForm } from "../barter/PostABarter"
import { UserContainer } from "../barter/UserContainer"
import { HomePage } from "../homePage/HomePage"
import { ProfileHome } from "../user/ProfileHome"
import { ProfilePage } from "../user/ProfilePage"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    {/* <h1>Beauty Barter</h1> */}
                    

                    <Outlet />
                </>
            }>
                <Route path="viewBarter" element={ <BarterContainer /> } />
                <Route path="postBarter" element= { <BarterForm />} />
                <Route path="profile" element= { <ProfileHome />} />
                <Route path="barters/:barterId/edit" element={ <BarterEdit/> } />
                <Route path="about" element={ <AboutSection /> } />
                <Route path="userProfile/:id" element={ <ProfilePage /> } />
                <Route path="home" element={ <HomePage /> } />
                <Route path="users" element={ <UserContainer /> } />
            
            </Route>
           
        </Routes>
    )
}
