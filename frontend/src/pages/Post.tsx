import axios from "axios";
import PostDate from "../components/post/PostDate";
import PostHeading from "../components/post/PostHeading";

import { useEffect, useState } from "react";
import { BackendUrl } from "../config";
import { useNavigate, useParams  } from "react-router-dom";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Likes from "../components/Likes";


const Post=()=>{
    const [object, setObject] = useState({
        author: { 
            id: 0,
            username: "",
            email: "",
            password: ""
        },
        content: "",
        createdAt: "",
        updatedAt: "",
        title: "",
        link: "",
        likes: []
    });
    
    const [loader,setLoading]=useState(true);
    const [isLiked,setLiked]=useState(false);

    const {id}=useParams();

    const navigator=useNavigate();


    useEffect(()=>{
        try{
            async function callMe(){
             
                const res=await axios({
                    url:`${BackendUrl}/post/posts/${id}`,
                    method:"GET",
                    headers:{
                        "Authorization":localStorage.getItem("id")
                    }
                });
               
                setObject(res.data);

                let ans=false;
                res.data.likes.forEach((item:any)=>{
                    if(item.userId===Number(localStorage.getItem("id"))){
                        ans=true;
                    }
                })
                setLiked(ans);
                setLoading(false);
                
            }
            callMe();
        }catch(e){
            alert("Failed to get post try again!");
        }
    },[]);

    async function handleDelete(){
        try{
            const ans=prompt("Sure Want to delete?y/n");
            if(ans=="y")
            {
                await axios({
                    url:`${BackendUrl}/post/posts/${id}`,
                    method:"DELETE",
                    headers:{
                        "Authorization":localStorage.getItem("id")
                    }
                });
                navigator("/posts");
            }
        }catch(e){
            alert("Failed to delete post try again!");
        }
    }
    
    return(
        <>
        
        {
            loader?
            <div className="m-[7%]">
                <Loader></Loader>
            </div>
            :
            <div className="m-[10%] mt-0 space-y-8 md:space-y-12">
                <NavBar to="/posts"></NavBar>
                <hr></hr>
                <div className="grid  md:grid-cols-5">
                    <div className="md:col-span-4 space-y-5 md:m-[6%] mt-5">
                        <PostHeading text={object.title}></PostHeading>
                        <div className="lg:relative">
                            
                            <div>
                                <PostDate text={"Created Date: "+(object.createdAt+"").slice(0,10)}></PostDate>
                                <PostDate text={"Created Time: "+(object.createdAt+"").slice(11,19)}></PostDate>
                            </div>
                            <Likes count={object.likes.length} postId={Number(id)} userId={Number(localStorage.getItem("id"))} isDone={isLiked}/>
                            
                        </div>
                        
                        <img src={object.link} alt="img" className=" w-[100%] lg:h-[20%] mb-5 rounded-md"/>
                        <p className="text-xl leading-relaxed text-slate-700">{object.content}</p>
                        <hr/>
                        {
                            object.author.id===Number(localStorage.getItem("id"))?
                            <div className="flex space-x-5 ">
                                <button onClick={()=>handleDelete()} className="font-semibold px-4 py-2 bg-black rounded-lg text-lg active:bg-gray-900  text-red-600">Delete</button>
                                <button className="font-semibold px-4 py-2 bg-black rounded-lg text-lg active:bg-gray-900  text-yellow-600">Update</button>
                                
                            </div>
                            :
                            ""
                        }
                        
                    </div>
                    <div className="md:col-span-1 mx-8 md:mt-[40%] sm:mx-0 invisible md:visible">
                        <h1 className="text-md md:text-xl font-bold text-slate-800">Author</h1>
                        <p>{object.author.username}</p>
                    </div>
                </div>
                
            </div>
        }
        </>
        
    );
    
}
export default Post;