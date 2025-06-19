"use client"
import { useRouter } from 'next/navigation'
import React ,{ useState }from 'react'


const RegisterPage = () => {
    const [email, setemail]= useState("a@b.c");
    const [password, setpassword]= useState("");
    const [confirmPassword, setconfirmPassword]= useState("");
    const router = useRouter(); // Use the router for navigation


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { //React.FormEvent is a reacts own type for form events that is 
      //used to type the event object in the handleSubmit function


      // Prevent the default form submission behavior
      // it actually works without this but it is a good practice
      // to prevent the page from reloading
      e.preventDefault();
      if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
      } // Make sure to handle the case where passwords do not match

      try {
        // its simple but can manage loading , debounce ,errors and other things
        // we can manage either manually or react-query.


        //we need to send a POST request to the API endpoint coz 
        // This is a placeholder URL, replace it with your actual API endpoint
        // use can use any HTTP client like axios or fetch but here we will use fetch
        // 
        const res = await fetch("api/auth/register" , {
          method: "POST", // Use POST method for registration

          //header are the metadata , meta data means the data about the data 
          // we send header coz server needs to know it 
          // so will it work without headers? yes it will work but it is a good practice to send headers
          // 
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },

          // now lets send actual data in the body of the request
          body: JSON.stringify({
            // always stringify the data coz server expects like that
            // after stringify it looks like this {"email":"a@b.c","password":"123456"}
            email: email,
            password: password,
          }),
        })

        //lets take res in a variable and check if it is ok or not
        const data = await res.json();
        //actaully registration is successfull at this point if res.ok is true
        if(res.ok) {
          // If the response is OK, registration was successful
          console.log("Registration successful:", data);
          alert("Registration successful!");
          router.push("/login"); // Redirect to the login page after successful registration
        }else{
          throw new Error(data.message || "Registration failed"); // Handle errors from the server
        }
        
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
        
      }
    }
  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <br /> 
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
          />
        <br />
        <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setconfirmPassword(e.target.value)}
        required
        />
        <br />
        <button type="submit">Register</button>
        {/* This button will trigger the handleSubmit function when clicked */}

        <br />
        <p>Already have an account? <a href="/login">Login here</a></p>
        {/* Link to the login page */}

      </form>
        
    </div>
    
  )    
}

export default RegisterPage
