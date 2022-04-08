import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/Home"
import UserAdminPage from "./pages/admin/user"
import './App.css'
import './index.less';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin">
          <Route path="users" element={<UserAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
