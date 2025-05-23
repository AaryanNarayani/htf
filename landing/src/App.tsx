import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import LandingPage from "./pages/landing/LandingPage"
import { Toaster } from "sonner"
function App() {
  return (
    <Router>
      
    <Toaster richColors={true}  />
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App