import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/user/LoginPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
