import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName || "",
          photo: user.photoURL || "",
          lastName: "",
        });
        
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("Google login error: ", error);
      toast.error("Failed to sign in with Google");
    }
  }
  
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../../google.png")} width={"60%"} alt="Google Sign-In" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;