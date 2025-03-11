import { Route, BrowserRouter, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
// import GuestLayout from "./layout/GuestLayout";
import SignIn from "./pages/AuthPages/AuthFirebase";
import Register from "./pages/AuthPages/register";
import NotFound from "./pages/OtherPage/NotFound";

import Dashboard from "./pages/Dashboard/Dashboard";
// import BasicTables from "./pages/Tables/BasicTables";
import UserProfiles from "./pages/Users/UserProfiles";
import Users from "./pages/Users/Users";
import Members from "./pages/Users/Members";

import Guest from "./pages/Guest";
import WaitingRoom from "./pages/Game/WaitingRoom";
import TeamWaitingRoom from "./pages/Game/TeamWaitingRoom";
import Setting from "./pages/Game/Setting";
import Scoreboard from "./pages/Game/Scoreboard";

import Invite from "./pages/Game/QRpage";
import ScannerQR from "./components/Game/Scanner";

import MatchHistory from "./pages/Game/MatchHistory";
import CreateMatchForm from "./components/Game/CreateMatchForm";

import Stores from "../src/pages/Stores/StoreManagement";
import CreateStore from "./pages/Stores/CreateStore";
import TableStore from "./pages/Tables/Table-Store";

import RoleBasedRedirect from "./components/RoleBasedRedirect";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<GuestLayout />}> */}
            {/* Guest Layout */}
            <Route path="/" element={<Guest />} />
            <Route path="/team-waiting-room/:tableId" element={<TeamWaitingRoom />} />
            <Route path="/waiting-room/:tableId" element={<WaitingRoom />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/Scoreboard" element={<Scoreboard />} />

            <Route path="/qrCode" element={<Invite />} />
            <Route path="/scanner-qr" element={<ScannerQR />} />

            <Route path="/create-match" element={<CreateMatchForm />} />
          {/* </Route> */}

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/auth" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/redirect" element={<RoleBasedRedirect />} />
          </Route>

          {/* Admin route */}
          <Route element={<AppLayout />}>
            <Route index path="/admin" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/members" element={<Members />} />
            {/* <Route path="/tables" element={<BasicTables />} /> */}
            <Route path="/users/profile" element={<UserProfiles />} />
            <Route path="/matches" element={<MatchHistory />} />

            <Route path="/stores" element={<Stores />} />
            <Route path="/create-store" element={<CreateStore />} />
            <Route path="/table-store/:storeId" element={<TableStore />} />
          </Route>

          {/* Manager route */}
          <Route element={<AppLayout />}>
            <Route index path="/manager" element={<Users />} />
            <Route path="/members" element={<Members />} />
            {/* <Route path="/tables" element={<BasicTables />} /> */}
            <Route path="/users/profile" element={<UserProfiles />} />
            <Route path="/matches" element={<MatchHistory />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
