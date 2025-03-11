"use client"

import * as React from "react"
import {
  DollarSign,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShoppingBag,
  TableIcon,
  Trophy,
  User,
  Users,
  Search,
  Bell,
  Eye,
  Edit,
} from "lucide-react"

// Sample data for the dashboard
const tableStatus = [
  {
    id: 1,
    name: "Bàn 1",
    status: "Đang sử dụng",
    timeRemaining: "45 phút",
    player: "Nguyễn Văn A",
    startTime: "14:30",
  },
  { id: 2, name: "Bàn 2", status: "Đang sử dụng", timeRemaining: "15 phút", player: "Trần Văn B", startTime: "15:45" },
  { id: 3, name: "Bàn 3", status: "Trống", timeRemaining: null, player: null, startTime: null },
  { id: 4, name: "Bàn 4", status: "Đang sử dụng", timeRemaining: "90 phút", player: "Lê Thị C", startTime: "13:00" },
  { id: 5, name: "Bàn 5", status: "Bảo trì", timeRemaining: null, player: null, startTime: null },
  { id: 6, name: "Bàn 6", status: "Đang sử dụng", timeRemaining: "30 phút", player: "Phạm Văn D", startTime: "15:30" },
  { id: 7, name: "Bàn 7", status: "Trống", timeRemaining: null, player: null, startTime: null },
  { id: 8, name: "Bàn 8", status: "Trống", timeRemaining: null, player: null, startTime: null },
]

const recentMatches = [
  {
    id: "1",
    player1: {
      name: "Nguyễn Văn A",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 5,
    },
    player2: {
      name: "Trần Văn B",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 3,
    },
    date: "Hôm nay, 14:30",
    table: "Bàn 3",
    duration: "45 phút",
  },
  {
    id: "2",
    player1: {
      name: "Lê Thị C",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 5,
    },
    player2: {
      name: "Phạm Văn D",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 2,
    },
    date: "Hôm nay, 12:15",
    table: "Bàn 1",
    duration: "38 phút",
  },
  {
    id: "3",
    player1: {
      name: "Hoàng Văn E",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 4,
    },
    player2: {
      name: "Vũ Thị F",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 5,
    },
    date: "Hôm qua, 18:45",
    table: "Bàn 5",
    duration: "52 phút",
  },
  {
    id: "4",
    player1: {
      name: "Đặng Văn G",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 5,
    },
    player2: {
      name: "Bùi Thị H",
      avatar: "/placeholder.svg?height=32&width=32",
      score: 1,
    },
    date: "Hôm qua, 16:30",
    table: "Bàn 2",
    duration: "30 phút",
  },
]

const topPlayers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=32&width=32",
    wins: 42,
    losses: 5,
    winRate: "89%",
    membership: "VIP",
    lastVisit: "Hôm nay",
  },
  {
    id: "2",
    name: "Trần Văn B",
    avatar: "/placeholder.svg?height=32&width=32",
    wins: 38,
    losses: 7,
    winRate: "84%",
    membership: "VIP",
    lastVisit: "Hôm qua",
  },
  {
    id: "3",
    name: "Lê Thị C",
    avatar: "/placeholder.svg?height=32&width=32",
    wins: 35,
    losses: 10,
    winRate: "78%",
    membership: "Thường",
    lastVisit: "3 ngày trước",
  },
  {
    id: "4",
    name: "Phạm Văn D",
    avatar: "/placeholder.svg?height=32&width=32",
    wins: 30,
    losses: 12,
    winRate: "71%",
    membership: "Thường",
    lastVisit: "Hôm nay",
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    avatar: "/placeholder.svg?height=32&width=32",
    wins: 28,
    losses: 15,
    winRate: "65%",
    membership: "VIP",
    lastVisit: "2 ngày trước",
  },
]

const stores = [
  {
    id: "1",
    name: "Bida Club Quận 1",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    tables: 8,
    staff: 5,
    revenue: "45.000.000đ",
    status: "Hoạt động",
  },
  {
    id: "2",
    name: "Bida Club Quận 3",
    address: "456 Lê Văn Sỹ, Quận 3, TP.HCM",
    tables: 12,
    staff: 8,
    revenue: "62.000.000đ",
    status: "Hoạt động",
  },
  {
    id: "3",
    name: "Bida Club Quận 7",
    address: "789 Nguyễn Thị Thập, Quận 7, TP.HCM",
    tables: 10,
    staff: 6,
    revenue: "38.000.000đ",
    status: "Hoạt động",
  },
  {
    id: "4",
    name: "Bida Club Thủ Đức",
    address: "101 Võ Văn Ngân, TP. Thủ Đức, TP.HCM",
    tables: 6,
    staff: 4,
    revenue: "28.000.000đ",
    status: "Đang sửa chữa",
  },
]

const staff = [
  {
    id: "1",
    name: "Nguyễn Thị Hương",
    avatar: "/placeholder.svg?height=32&width=32",
    position: "Quản lý",
    store: "Bida Club Quận 1",
    status: "Đang làm việc",
    shift: "8:00 - 16:00",
  },
  {
    id: "2",
    name: "Trần Văn Minh",
    avatar: "/placeholder.svg?height=32&width=32",
    position: "Nhân viên phục vụ",
    store: "Bida Club Quận 1",
    status: "Đang làm việc",
    shift: "8:00 - 16:00",
  },
  {
    id: "3",
    name: "Lê Thị Lan",
    avatar: "/placeholder.svg?height=32&width=32",
    position: "Thu ngân",
    store: "Bida Club Quận 3",
    status: "Đang làm việc",
    shift: "16:00 - 23:00",
  },
  {
    id: "4",
    name: "Phạm Văn Tuấn",
    avatar: "/placeholder.svg?height=32&width=32",
    position: "Nhân viên phục vụ",
    store: "Bida Club Quận 3",
    status: "Nghỉ phép",
    shift: "16:00 - 23:00",
  },
  {
    id: "5",
    name: "Hoàng Thị Mai",
    avatar: "/placeholder.svg?height=32&width=32",
    position: "Quản lý",
    store: "Bida Club Quận 7",
    status: "Đang làm việc",
    shift: "8:00 - 16:00",
  },
]

const revenueData = [
  {
    name: "T2",
    total: 1200000,
  },
  {
    name: "T3",
    total: 1800000,
  },
  {
    name: "T4",
    total: 2400000,
  },
  {
    name: "T5",
    total: 1600000,
  },
  {
    name: "T6",
    total: 3000000,
  },
  {
    name: "T7",
    total: 4200000,
  },
  {
    name: "CN",
    total: 3600000,
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = React.useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </button>
        <a href="#" className="flex items-center gap-2 font-semibold md:text-lg">
          <Trophy className="h-6 w-6 text-blue-600" />
          <span>Bida Club Manager</span>
        </a>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-64 rounded-full bg-gray-100 py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
          <button className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
            <Bell className="h-5 w-5" />
          </button>
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="/placeholder.svg?height=32&width=32" alt="Avatar" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2 font-semibold">
                <Trophy className="h-6 w-6 text-blue-600" />
                <span>Bida Club Manager</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-5 h-0 flex-1 overflow-y-auto">
              <nav className="grid gap-y-2 px-4">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-blue-600"
                  onClick={() => {
                    setActiveTab("overview")
                    setMobileMenuOpen(false)
                  }}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setActiveTab("tables")
                    setMobileMenuOpen(false)
                  }}
                >
                  <TableIcon className="h-5 w-5" />
                  <span>Quản lý bàn</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setActiveTab("players")
                    setMobileMenuOpen(false)
                  }}
                >
                  <Trophy className="h-5 w-5" />
                  <span>Người chơi</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setActiveTab("stores")
                    setMobileMenuOpen(false)
                  }}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Cửa hàng</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setActiveTab("staff")
                    setMobileMenuOpen(false)
                  }}
                >
                  <User className="h-5 w-5" />
                  <span>Nhân viên</span>
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">
                  <Settings className="h-5 w-5" />
                  <span>Cài đặt</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r bg-white md:block">
          <div className="h-[calc(100vh-64px)] overflow-y-auto">
            <div className="flex h-full flex-col gap-2 p-4">
              <a
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${activeTab === "overview" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("overview")}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
              <a
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${activeTab === "tables" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("tables")}
              >
                <TableIcon className="h-5 w-5" />
                <span>Quản lý bàn</span>
              </a>
              <a
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${activeTab === "players" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("players")}
              >
                <Trophy className="h-5 w-5" />
                <span>Người chơi</span>
              </a>
              <a
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${activeTab === "stores" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("stores")}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Cửa hàng</span>
              </a>
              <a
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${activeTab === "staff" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
                onClick={() => setActiveTab("staff")}
              >
                <User className="h-5 w-5" />
                <span>Nhân viên</span>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">
                <Settings className="h-5 w-5" />
                <span>Cài đặt</span>
              </a>
              <div className="mt-auto">
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">
                  <LogOut className="h-5 w-5" />
                  <span>Đăng xuất</span>
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
                  <DollarSign className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">173.000.000đ</div>
                  <p className="text-xs text-gray-500">+12% so với tháng trước</p>
                </div>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Tổng số bàn</p>
                  <TableIcon className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">36</div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-green-500 font-medium">28</span>
                    <span className="text-gray-500">hoạt động</span>
                    <span className="text-yellow-500 font-medium ml-2">6</span>
                    <span className="text-gray-500">trống</span>
                    <span className="text-red-500 font-medium ml-2">2</span>
                    <span className="text-gray-500">bảo trì</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Tổng số người chơi</p>
                  <Users className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2,845</div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-blue-600 font-medium">420</span>
                    <span className="text-gray-500">VIP</span>
                    <span className="text-gray-500 ml-2">+24 thành viên mới trong tuần</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-gray-500">Tổng số nhân viên</p>
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">23</div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-green-500 font-medium">20</span>
                    <span className="text-gray-500">đang làm việc</span>
                    <span className="text-yellow-500 font-medium ml-2">3</span>
                    <span className="text-gray-500">nghỉ phép</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="border-b">
                <div className="flex flex-wrap -mb-px">
                  <button
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 ${
                      activeTab === "overview"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Tổng quan
                  </button>
                  <button
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 ${
                      activeTab === "tables"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("tables")}
                  >
                    Bàn bida
                  </button>
                  <button
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 ${
                      activeTab === "players"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("players")}
                  >
                    Người chơi
                  </button>
                  <button
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 ${
                      activeTab === "stores"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("stores")}
                  >
                    Cửa hàng
                  </button>
                  <button
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 ${
                      activeTab === "staff"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("staff")}
                  >
                    Nhân viên
                  </button>
                </div>
              </div>

              <div className="p-4">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div className="col-span-2 rounded-lg border bg-white p-4 shadow-sm">
                        <div className="mb-4">
                          <h3 className="text-lg font-medium">Doanh thu theo ngày</h3>
                          <p className="text-sm text-gray-500">Doanh thu trong 7 ngày gần nhất</p>
                        </div>
                        <div className="h-[350px] w-full">
                          <div className="flex h-full items-end">
                            {revenueData.map((item, index) => (
                              <div key={index} className="flex flex-1 flex-col items-center">
                                <div
                                  className="w-full max-w-[50px] rounded-t-md bg-blue-500"
                                  style={{ height: `${(item.total / 4200000) * 300}px` }}
                                ></div>
                                <div className="mt-2 text-xs font-medium">{item.name}</div>
                                <div className="text-xs text-gray-500">{(item.total / 1000000).toFixed(1)}tr</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border bg-white p-4 shadow-sm">
                        <div className="mb-4">
                          <h3 className="text-lg font-medium">Trạng thái bàn</h3>
                          <p className="text-sm text-gray-500">Tình trạng sử dụng bàn hiện tại</p>
                        </div>
                        <div className="space-y-8">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <span className="text-sm">Đang sử dụng</span>
                              </div>
                              <span className="text-sm font-medium">4/8</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                              <div className="h-full w-1/2 bg-green-500"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <span className="text-sm">Trống</span>
                              </div>
                              <span className="text-sm font-medium">3/8</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                              <div className="h-full w-[37.5%] bg-yellow-500"></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <span className="text-sm">Bảo trì</span>
                              </div>
                              <span className="text-sm font-medium">1/8</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                              <div className="h-full w-[12.5%] bg-red-500"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                      <div className="lg:col-span-4 rounded-lg border bg-white shadow-sm">
                        <div className="border-b p-4">
                          <h3 className="text-lg font-medium">Trận đấu gần đây</h3>
                          <p className="text-sm text-gray-500">Các trận đấu đã diễn ra trong 24 giờ qua</p>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {recentMatches.map((match) => (
                              <div key={match.id} className="flex items-center justify-between rounded-lg border p-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                    <img
                                      src={match.player1.avatar || "/placeholder.svg"}
                                      alt={match.player1.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{match.player1.name}</p>
                                    <p className="text-xs text-gray-500">{match.table}</p>
                                  </div>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="flex items-center gap-2 font-bold">
                                    <span>{match.player1.score}</span>
                                    <span>-</span>
                                    <span>{match.player2.score}</span>
                                  </div>
                                  <p className="text-xs text-gray-500">{match.duration}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <p className="text-sm font-medium">{match.player2.name}</p>
                                    <p className="text-xs text-gray-500">{match.date}</p>
                                  </div>
                                  <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                    <img
                                      src={match.player2.avatar || "/placeholder.svg"}
                                      alt={match.player2.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t p-4">
                          <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Xem tất cả trận đấu
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-3 rounded-lg border bg-white shadow-sm">
                        <div className="border-b p-4">
                          <h3 className="text-lg font-medium">Top người chơi</h3>
                          <p className="text-sm text-gray-500">Người chơi có thành tích tốt nhất</p>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {topPlayers.slice(0, 5).map((player, index) => (
                              <div key={player.id} className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 font-bold">
                                  {index + 1}
                                </div>
                                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                  <img
                                    src={player.avatar || "/placeholder.svg"}
                                    alt={player.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center">
                                    <p className="text-sm font-medium">{player.name}</p>
                                    {player.membership === "VIP" && (
                                      <span className="ml-2 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                                        VIP
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    {player.wins}W - {player.losses}L ({player.winRate})
                                  </p>
                                </div>
                                <div className="text-xs text-gray-500">{player.lastVisit}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t p-4">
                          <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Xem tất cả người chơi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tables Tab */}
                {activeTab === "tables" && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Quản lý bàn bida</h3>
                        <p className="text-sm text-gray-500">
                          Quản lý tình trạng các bàn bida và theo dõi thời gian sử dụng
                        </p>
                      </div>
                      <button className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:mt-0">
                        Thêm bàn mới
                      </button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      {tableStatus.map((table) => (
                        <div
                          key={table.id}
                          className={`overflow-hidden rounded-lg border ${
                            table.status === "Đang sử dụng"
                              ? "border-green-500"
                              : table.status === "Trống"
                                ? "border-yellow-500"
                                : "border-red-500"
                          } bg-white shadow-sm`}
                        >
                          <div
                            className={`p-4 ${
                              table.status === "Đang sử dụng"
                                ? "bg-green-50"
                                : table.status === "Trống"
                                  ? "bg-yellow-50"
                                  : "bg-red-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-base font-medium">{table.name}</h3>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  table.status === "Đang sử dụng"
                                    ? "bg-green-100 text-green-800"
                                    : table.status === "Trống"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {table.status}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            {table.status === "Đang sử dụng" ? (
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Người chơi:</span>
                                  <span className="text-sm font-medium">{table.player}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Bắt đầu:</span>
                                  <span className="text-sm font-medium">{table.startTime}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Còn lại:</span>
                                  <span className="text-sm font-medium">{table.timeRemaining}</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 mt-2">
                                  <div className="h-full w-[60%] bg-green-500"></div>
                                </div>
                              </div>
                            ) : table.status === "Trống" ? (
                              <div className="flex flex-col items-center justify-center py-4">
                                <p className="text-sm text-gray-500 mb-2">Sẵn sàng sử dụng</p>
                                <button className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700">
                                  Đặt bàn
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center py-4">
                                <p className="text-sm text-gray-500 mb-2">Đang trong quá trình bảo trì</p>
                                <span className="rounded-full border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
                                  Không khả dụng
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between pt-4">
                      <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Xuất báo cáo
                      </button>
                      <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Lịch bảo trì
                      </button>
                    </div>
                  </div>
                )}

                {/* Players Tab */}
                {activeTab === "players" && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Quản lý người chơi</h3>
                        <p className="text-sm text-gray-500">Danh sách và thông tin chi tiết về người chơi</p>
                      </div>
                      <div className="mt-2 flex gap-2 sm:mt-0">
                        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                          Lọc
                        </button>
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                          Thêm người chơi
                        </button>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Người chơi</th>
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Thành tích</th>
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Loại thành viên</th>
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Lần ghé gần nhất</th>
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topPlayers.map((player) => (
                              <tr key={player.id} className="border-b">
                                <td className="p-3">
                                  <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                      <img
                                        src={player.avatar || "/placeholder.svg"}
                                        alt={player.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium">{player.name}</p>
                                      <p className="text-sm text-gray-500">ID: #{player.id}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">
                                      {player.wins}W - {player.losses}L
                                    </p>
                                    <p className="text-sm text-gray-500">Tỉ lệ thắng: {player.winRate}</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <span
                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                      player.membership === "VIP"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {player.membership}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <p>{player.lastVisit}</p>
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-2">
                                    <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                      <Eye className="h-4 w-4" />
                                      <span className="sr-only">Xem</span>
                                    </button>
                                    <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Sửa</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex items-center justify-between border-t p-4">
                        <div className="text-sm text-gray-500">Hiển thị 5 trên tổng số 2,845 người chơi</div>
                        <div className="flex gap-2">
                          <button
                            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-400"
                            disabled
                          >
                            Trước
                          </button>
                          <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Tiếp
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stores Tab */}
                {activeTab === "stores" && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Quản lý cửa hàng</h3>
                        <p className="text-sm text-gray-500">Danh sách các cửa hàng và thông tin chi tiết</p>
                      </div>
                      <button className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:mt-0">
                        Thêm cửa hàng
                      </button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {stores.map((store) => (
                        <div key={store.id} className="rounded-lg border bg-white shadow-sm">
                          <div className="border-b p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium">{store.name}</h3>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  store.status === "Hoạt động"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {store.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{store.address}</p>
                          </div>
                          <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Số bàn</p>
                                <p className="text-2xl font-bold">{store.tables}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Nhân viên</p>
                                <p className="text-2xl font-bold">{store.staff}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-sm font-medium text-gray-500">Doanh thu tháng</p>
                                <p className="text-2xl font-bold">{store.revenue}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between border-t p-4">
                            <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                              Chi tiết
                            </button>
                            <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                              Báo cáo
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Staff Tab */}
                {activeTab === "staff" && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Quản lý nhân viên</h3>
                        <p className="text-sm text-gray-500">Danh sách nhân viên và thông tin ca làm việc</p>
                      </div>
                      <button className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:mt-0">
                        Thêm nhân viên
                      </button>
                    </div>
                    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Nhân viên</th>
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Vị trí</th>
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Cửa hàng</th>
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Ca làm việc</th>
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Trạng thái</th>
                              <th className="p-3 text-left text-sm font-medium text-gray-500">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {staff.map((employee) => (
                              <tr key={employee.id} className="border-b">
                                <td className="p-3">
                                  <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                      <img
                                        src={employee.avatar || "/placeholder.svg"}
                                        alt={employee.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium">{employee.name}</p>
                                      <p className="text-sm text-gray-500">ID: #{employee.id}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3">{employee.position}</td>
                                <td className="p-3">{employee.store}</td>
                                <td className="p-3">{employee.shift}</td>
                                <td className="p-3">
                                  <span
                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                      employee.status === "Đang làm việc"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {employee.status}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-2">
                                    <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                      <Eye className="h-4 w-4" />
                                      <span className="sr-only">Xem</span>
                                    </button>
                                    <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Sửa</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex items-center justify-between border-t p-4">
                        <div className="text-sm text-gray-500">Hiển thị 5 trên tổng số 23 nhân viên</div>
                        <div className="flex gap-2">
                          <button
                            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-400"
                            disabled
                          >
                            Trước
                          </button>
                          <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Tiếp
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

