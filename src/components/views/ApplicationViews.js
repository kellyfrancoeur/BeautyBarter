import { Outlet, Route, Routes } from "react-router-dom"
import { AboutSection } from "../barter/AboutSection"
import { BarterEdit } from "../barter/BarterEdit"
import { BarterList } from "../barter/BarterList"
import { BarterForm } from "../barter/PostABarter"
import { ProfileHome } from "../user/ProfileHome"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    {/* <h1>Beauty Barter</h1> */}
                    

                    <Outlet />
                </>
            }>
                <Route path="viewBarter" element={ <BarterList /> } />
                <Route path="postBarter" element= { <BarterForm />} />
                <Route path="profile" element= { <ProfileHome />} />
                <Route path="barters/:barterId/edit" element={ <BarterEdit/> } />
                <Route path="about" element={ <AboutSection /> } />
            
            </Route>
           
        </Routes>
    )
}