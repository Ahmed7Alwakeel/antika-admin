import '../styles/app.scss';
import '../styles/app-rtl.scss';
import Layout from '../components/layout/Layout';
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Providers from './Providers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Login from './pages/auth/Login';
import ProtectedRoutes from '../utils/ProtectedRoutes';
import ProtectedAuth from '../utils/ProtectedAuth';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Categories from './pages/categories/Categories';
import CreateCategory from './pages/categories/CreateCategory';
import Users from './pages/Users';
import CreateBranch from './pages/branches/CreateBranch';
import Branches from './pages/branches/Branches';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);


  return (
    <BrowserRouter>
      <Providers>
        <Layout>
          <Routes>
            <Route path='/' element={<ProtectedRoutes />}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/create-category" element={<CreateCategory />} />
              <Route path="/categories/create-category/:id" element={<CreateCategory />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/branches/create-branch" element={<CreateBranch />} />
              <Route path="/branches/create-branch/:id" element={<CreateBranch />} />
              <Route path="/users" element={<Users />} />
              <Route path="/not-found" element={<NotFound />} />
            </Route>
            <Route element={<ProtectedAuth />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/forget-password" element={<Login />} />
            </Route>
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </Layout>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
