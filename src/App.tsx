import { Route, BrowserRouter as Router, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import Ecommerce from "./pages/Dashboard/ECommerce";
import FormElements from "./pages/Forms/FormElements";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import UserProfiles from "./pages/UserProfiles";
import Users from "./pages/Users"; // Import Users page
import Guest from "./pages/Guest"; // Import Guest page
import GuestLayout from "./layout/GuestLayout";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Admin route */}
          <Route element={<AppLayout />}>
            {/* <Route index path="/" element={<BasicTables />} /> */}
            <Route path="/dashboard" element={<Ecommerce />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tables" element={<BasicTables />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            
          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Guest Route */}
          <Route element={<GuestLayout />}></Route>
           <Route path="/" element={<Guest />} />

          {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

          {/* Ui Elements */}
            <Route path="/blank" element={<Blank />} />
            
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  );
}
