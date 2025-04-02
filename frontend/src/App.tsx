import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/user/LoginPage'
import SignUpPage from './pages/user/SignUpPage'
import Navbar from './components/task/Navbar'
import Sidebar from './components/task/Sidebar'
import HomePage from './pages/user/HomePage'

const App = () => {
  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  </div>
  )
}

export default App
