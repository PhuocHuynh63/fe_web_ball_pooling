import { Route, BrowserRouter as Router, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import GuestLayout from "./layout/GuestLayout";
import SignIn from "./pages/AuthPages/SignIn";
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
import Users from "./pages/Users";
import Guest from "./pages/Guest";
import WaitingRoom from "./pages/Game/WaitingRoom";
import Setting from "./pages/Game/Setting";
import Scoreboard from "./pages/Game/Scoreboard";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Admin route */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<BasicTables />} />
            <Route path="/dashboard" element={<Ecommerce />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tables" element={<BasicTables />} />
            <Route path="/profile" element={<UserProfiles />} />

            
          

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
          
          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>

          {/* Guest Layout */}
            <Route path="/1" element={<Guest />} />
            <Route path="/waiting-room/:tableId" element={<WaitingRoom />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/Scoreboard" element={<Scoreboard />} />
           
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  );
}
