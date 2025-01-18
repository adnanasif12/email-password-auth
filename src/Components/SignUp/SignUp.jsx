import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BsDisplay } from 'react-icons/bs';


const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;

        console.log(email, password,name,photo, terms);


        // reset error message
        setErrorMessage('');
        setSuccess(false);

        if (!terms) {
            setErrorMessage('Accept your terms and condition');
            return;
        }

        const passwordRegeX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/;
        if (!passwordRegeX.test(password)) {
            setErrorMessage('Password should be error At least one lowercase, one uppercase, one digit, and one special character');
            return;
        }




        // createUserWithemailpass
        // createUserWithEmailAndPassword(auth,email,password)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true);

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("Sent Email verification")
                    })
                    // update profile
                    const profile ={
                        displayName:name,
                        photoURL: photo
                    }

                    updateProfile(auth.currentUser,profile)
                    .then(() => {
                        console.log('update your Profile')
                    })
                    .catch((error)=>{
                        console.log(error, 'user profile update error')
                    })
            })
            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message)
                setSuccess(false)
            })
    }





    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-4xl font-bold">Login now!</h1>

            <form onSubmit={handleSignUp} className="card-body ">

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" name='name' className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="text" placeholder="Photo-Url" name='photo' className="input input-bordered" required />
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'true' : 'password'}
                        name='password'
                        placeholder="password"
                        className="input input-bordered"
                        required />

                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className='btn btn-xs absolute right-3 top-12'>
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>


                <div className="form-control">
                    <label className="justify-start gap-5 cursor-pointer label">
                        <input type="checkbox"
                            name='terms'
                            className="checkbox checkbox-accent" />
                        <span className="label-text">Accept Our Time and Condition</span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign-Up</button>
                </div>
            </form>

            {
                errorMessage && <p className='text-red-500'>{errorMessage}</p>
            }
            {
                success && <p className='text-green-500'>The registration is Successfull !</p>
            }
            <p>you have already and Account <Link to="/Login" >Please Login</Link> </p>


        </div>

    );
};

export default SignUp;