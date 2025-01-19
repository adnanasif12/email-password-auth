import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';
// import { CgPassword } from 'react-icons/cg';

const Login = () => {
    const [success, setSuccess] =useState (false);
    const [loginerror, setLoginErrorMessage] = useState('');
    const emailRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // reset Login
        setSuccess(false);
        setLoginErrorMessage('');
        

        // login with firwbase
        signInWithEmailAndPassword (auth, email, password)
        .then(result=>{
            console.log(result.user);
            

            if(!result.user.emailVerified){
                setLoginErrorMessage("Please verify your email address.")
            }
            else{
                setSuccess(true);
            }
        })

        .catch(error =>{
            console.log('ERROR', error.message);
            setLoginErrorMessage(error.message)

        })
    }
    const handleForgatePassword =()=>{
        console.log('get me the email address', emailRef.current.value);
        const email = emailRef.current.value;

        if (!email) {
            console.log('Please Provide your valied email address');
            
        } else {
            sendPasswordResetEmail(auth, email)
            .then(()=>{
                alert('Password reset mail sent, Please check your email address')
            })
        }
    }



    return (

        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold">Login now!</h1>

            <form onSubmit={handleLogin} className="card-body">
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" ref={emailRef} name='email' className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                    <label onClick={handleForgatePassword} className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            {
                success && <p className='text-green-700 ml-10'>User Log In Successfull !</p>
            }
            {
                loginerror && <p className='text-red-700'>{loginerror}</p>
            }

            {/* <p>New to this website. <Link to="/SignUp" >Please Sign-Up</Link> </p> */}
            <p>You are new in this website  <Link to="/SignUp" >Please Sign-Up First</Link>  </p>
        </div>


    );
};

export default Login;