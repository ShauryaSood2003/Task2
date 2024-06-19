import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import ResetPassword from "./pages/ResetPassword"
import NewPassword from "./pages/NewPassword"
import Posts from "./pages/Posts"
import Home from "./pages/Home"

function App() {
 
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="/newPassword" element={<NewPassword/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
