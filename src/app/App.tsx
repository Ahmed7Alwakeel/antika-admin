
import '../styles/app.scss';
import Layout from '../components/layout/Layout';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import Providers from './Providers';

function App() {

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
