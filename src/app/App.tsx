
import '../styles/app.scss';
import '../styles/app-rtl.scss';
import Layout from '../components/layout/Layout';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import Providers from './Providers';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {

  const { i18n } = useTranslation();
  useEffect(() => {
		document.documentElement.dir = i18n.dir();
		document.documentElement.lang = i18n.language;
	}, [i18n.language]);

  return (
    <Router>
      <Providers>
        <Layout>
          <div></div>
        </Layout>
      </Providers>
    </Router>
  );
}

export default App;
