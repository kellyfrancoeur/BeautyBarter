import { Route, Routes } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar"
import { Login } from "./components/homePage/Login"
import { Authorized } from "./components/views/Authorized"
import { Register } from "./components/homePage/Register"
import { ApplicationViews } from "./components/views/ApplicationViews"
import "./Barter.css"



export const Barter = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}
