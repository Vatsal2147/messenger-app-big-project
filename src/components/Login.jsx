import { useState } from 'react';
import {auth, googleProvider} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'
import {} from './config/firebase'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    console.log(auth?.currentUser?.email);
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch(err) {
            console.error(err);
        }
    };



    const logout = async () => {
        try{
            await signOut(auth);
        } catch(err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch(err) {
            console.error(err);
        }
    };
   
    
  return (
    <div className="">
        <div className="flex justify-center">
            <div>  
                <input className="border-3 border-red-500" placeholder="Email....." onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div> 
                <input className="border-3 border-blue-500" type="password" placeholder="Password...." onChange={(e)=> setPassword(e.target.value)}/>
            </div>
      
            
      
        </div>
        <div className='flex flex-col justify-center border-2'>
            <button onClick = {logout} className="self-center cursor-pointer bg-red-500 text-white border-black w-100">Logout</button>
            <button onClick = {signInWithGoogle} className="cursor-pointer"> Sign in with Google</button>
            <button onClick={signIn} className="self-center cursor-pointer border-3 border-red-500">Sign In</button>
        </div>
    </div>
  );
}

export default Login;