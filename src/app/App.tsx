
import '../styles/app.scss';
import '../styles/app-rtl.scss';
import Layout from '../components/layout/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Providers from './Providers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Login from './pages/auth/Login';
import Home from './Home';

const App: React.FC = () => {

  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);


  return (
    <Router>
      <Providers>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </Layout>
      </Providers>
    </Router>
  );
}

export default App;
