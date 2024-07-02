import React, { useEffect } from 'react';
import '../styles/app.scss';
import InitialLoader from '../components/loaders/InitialLoader';
import Layout from '../components/layout/Layout';
import Button from '../components/buttons/Button';

function App() {

  return (
    <div className="layout layout-with-loader">
      <InitialLoader />
     <div className="layout_inner">
      <Layout />
      <Button text='clickme'/>
     </div>
    </div>
  );
}

export default App;
