import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ResetPassword from "./pages/ResetPassword"
import NewPassword from "./pages/NewPassword"

function App() {
 
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/posts" element={<></>}/>
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="/newPassword" element={<NewPassword/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
