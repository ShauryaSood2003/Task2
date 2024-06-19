
import { useState } from "react";
import InputBox from "../components/InputBox";
import SignButton from "../components/sign/SignButton";
import SignHeading from "../components/sign/SignHeading";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../config";

const NewPassword=()=>{

    const [token,setToken]=useState("");
    const [password,setPassword]=useState("");

    const navivgate=useNavigate();

    async function handelClick(){
        try{
            const data={
                token:Number(token),
                id:Number(localStorage.getItem("id")),
                password
            }
            console.log(data,`${BackendUrl}/auth/newpassword`);
            
            const res=await axios({
                url:`${BackendUrl}/auth/newpassword`,
                method:"POST",
                data,
            })
            localStorage.setItem("id",res.data.id);
            localStorage.setItem("name",res.data.username);
            navivgate("/signin");
        }catch(e){
            console.log(e);
            alert("Failed to Sign Up try again!")
            
        }
    }
    return(
        
        <div className="flex justify-center items-center h-screen">
            <div className="md:w-[30%]">
                <div 
                    className="flex justify-center items-center flex-col my-5"
                >
                    <SignHeading 
                        text="Update Password"
                    ></SignHeading>
                    
                </div>
               
                <InputBox 
                    type="text" 
                    label="Token" 
                    placeholder="4-code token" 
                    autoFocus={false}
                    setFunction={setToken}
                ></InputBox>
                <InputBox 
                    type="password" 
                    label="Password" 
                    placeholder="******" 
                    autoFocus={false}
                    setFunction={setPassword}
                ></InputBox>
                <SignButton onClick={handelClick} text="Reset"></SignButton>
            </div>
        </div>
        
    )
}
export default NewPassword;