// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { Link } from "react-router";
// import GridShape from "../../components/common/GridShape";
// import { registerUser } from "../../api/auth";

 export function Register() {

    return (
        <div>
            <h1>Users</h1>
        </div>
    )
};


//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const [avatar, setAvatar] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form submitted");
//     console.log("Email:", email);
//     console.log("Password:", password);
//     console.log("First Name:", fname);
//     console.log("Last Name:", lname);

//     try {
//       const userData = {
//         email,
//         password,
//         firstName: fname,
//         lastName: lname,
//         avatar,
//       };

//       const response = await registerUser(userData);
//       console.log("User registered:", response);

//       toast.success("User Registered Successfully!!", {
//         position: "top-center",
//       });
//     } catch (error: any) {
//       console.log("Error creating user:", error.message);
//       toast.error(error.message, {
//         position: "bottom-center",
//       });
//     }
//   };

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     setAvatar(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setAvatarPreview(null);
//     }
//   };

//   return (
//     <div className="relative flex w-full h-screen overflow-hidden bg-gray-900 z-1 dark:bg-gray-900">
//       <div className="flex flex-col flex-1 p-4 rounded-2xl sm:rounded-none sm:border-0 sm:p-6">
//         <div className="flex justify-between items-center w-full max-w-md pt-5 mx-auto sm:py-8">
//           <div className="relative mx-auto">
//             <input
//               type="file"
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               onChange={handleAvatarChange}
//             />
//             <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
//               {avatarPreview ? (
//                 <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
//               ) : (
//                 <span className="text-gray-500 flex items-center justify-center h-full">Upload Avatar</span>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto p-2">
//           <form onSubmit={handleRegister} className="space-y-3">
//             <div className="mb-3 p-2">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
//                 First name<span className="text-error-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
//                 placeholder="First name"
//                 onChange={(e) => setFname(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3 p-2">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Last name
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
//                 placeholder="Last name"
//                 onChange={(e) => setLname(e.target.value)}
//               />
//             </div>

//             <div className="mb-3 p-2">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Email address<span className="text-error-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
//                 placeholder="Enter email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="mb-3 p-2">
//               <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password<span className="text-error-500">*</span>
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500"
//                 placeholder="Enter password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="d-grid">
//               <button
//                 type="submit"
//                 className="w-full px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
