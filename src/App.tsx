import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/Home"
import UserAdminPage from "./pages/admin/user"
import SkillAdminPage from "./pages/admin/skills"
import ProjectAdminPage from "./pages/admin/projects"
import SchoolAdminPage from "./pages/admin/schools"
import CertificateAdminPage from "./pages/admin/certificates"
import ToastContainer from './components/Toast';
import './App.css'
import './index.less';
import SkillDetailAdminPage from './pages/admin/skills/detail'
import ProjectDetailAdminPage from './pages/admin/projects/detail'
import SchoolDetailAdminPage from './pages/admin/schools/detail'
import CertificateDetailAdminPage from './pages/admin/certificates/detail'
import UserDetailAdminPage from './pages/admin/user/detail'
  
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin">
          <Route path="users" element={<UserAdminPage />} />
          <Route path="user">
            <Route path=":id" element={<UserDetailAdminPage />} />
          </Route>
          <Route path="skills" element={<SkillAdminPage />} />
          <Route path="skill">
            <Route path=":id" element={<SkillDetailAdminPage />} />
          </Route>
          <Route path="projects" element={<ProjectAdminPage />} />
          <Route path="project">
            <Route path=":id" element={<ProjectDetailAdminPage />} />
          </Route>
          <Route path="schools" element={<SchoolAdminPage />} />
          <Route path="school">
            <Route path=":id" element={<SchoolDetailAdminPage />} />
          </Route>
          <Route path="certificates" element={<CertificateAdminPage />} />
          <Route path="certificate">
            <Route path=":id" element={<CertificateDetailAdminPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
