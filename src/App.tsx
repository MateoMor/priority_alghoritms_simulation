import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Layout 
      title="Algoritmos de Prioridad"
      githubRepo="https://github.com/MateoMor/priority_alghoritms_simulation"
    >
      <HomePage />
    </Layout>
  );
}

export default App;
