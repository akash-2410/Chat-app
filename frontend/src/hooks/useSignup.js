// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

// const useSignup = () => {
//     const [loading, setLoading] = useState(false);
//     const {setAuthUser}=useAuthContext()

//     const signup=async({fullName, username, password, confirmPassword, gender})=>{
//         console.log("pre success");
//         console.log(fullName, username, password, confirmPassword, gender);
//         const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
//         console.log("after success",success);
//         if(!success)return;

//         setLoading(true);
//         try {
//             const res=await fetch("http://localhost:5000/api/auth/signup",{
//                 method:"POST",
//                 headers:{"Content-type":"application/json"},
//                 body:JSON.stringify({fullName, username, password, confirmPassword, gender}),
//         });

//         if (!res.ok) {
//         throw new Error("Failed to sign up"); // Handle non-200 status codes
//     }

//         const data= await res.json();
//         if(data.error){
//             throw new Error(data.error)
//         }
//         localStorage.setItem("chat-user",JSON.stringify(data))
//         setAuthUser(data);
//         toast.success("Signup successful!");

//         } catch (error) {
//             toast.error(error.message);
//         }finally{
//             setLoading(false);
//         }
//     };

//     return {loading,signup};

// };



// function handleInputErrors({fullName, username, password, confirmPassword, gender}){
//     if(!fullName || !username || !password || !confirmPassword || !gender){
//         toast.error("Please fill in all fields")
//         return false;
//     }

//     if(password!==confirmPassword){
//         toast.error("passwords do not match")
//         return false;
//     }

//     if(password.length<6){
//         toast.error("passsword must be atleast 6 characters")
//         return false;
//     }

//     return true;
// }

// export default useSignup;



import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            });

            // Check if response is OK
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Signup failed");
            }

            // Try parsing the response JSON
            let data;
            try {
                data = await res.json();
            } catch (jsonError) {
                throw new Error("Invalid JSON response");
            }

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Signup successful");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

