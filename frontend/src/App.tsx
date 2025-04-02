import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/user/LoginPage'
import SignUpPage from './pages/user/SignUpPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App
