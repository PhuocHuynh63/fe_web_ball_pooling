import { Route, BrowserRouter, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/AuthPages/AuthFirebase";
import Ecommerce from "./pages/Dashboard/ECommerce";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import UserProfiles from "./pages/Users/UserProfiles";
import Users from "./pages/Users/Users";
import Members from "./pages/Users/Members";
import Register from "./pages/AuthPages/register";
import Guest from "./pages/Guest";
import WaitingRoom from "./pages/Game/WaitingRoom";
import TeamWaitingRoom from "./pages/Game/TeamWaitingRoom";
import Setting from "./pages/Game/Setting";
import Scoreboard from "./pages/Game/Scoreboard";
import MatchHistory from "./pages/Game/MatchHistory";
import Invite from "./pages/Game/QRpage";
import ScannerQR from "./components/Game/Scanner";
import GuestLayout from "./layout/GuestLayout";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<GuestLayout />}>
            {/* Guest Layout */}
            <Route path="/" element={<Guest />} />
            <Route path="/team-waiting-room/:tableId" element={<TeamWaitingRoom />} />
            <Route path="/waiting-room/:tableId" element={<WaitingRoom />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/Scoreboard" element={<Scoreboard />} />
            <Route path="/qrCode" element={<Invite />} />
            <Route path="/scanner-qr" element={<ScannerQR />} />
          </Route>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/auth" element={<SignIn />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>

          {/* Admin route */}
          <Route element={<AppLayout />}>
            <Route index path="/admin" element={<BasicTables />} />
            <Route path="/dashboard" element={<Ecommerce />} />
            <Route path="/users" element={<Users />} />
            <Route path="/members" element={<Members />} />
            <Route path="/tables" element={<BasicTables />} />
            <Route path="/users/profile" element={<UserProfiles />} />
            <Route path="/matchs" element={<MatchHistory />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
