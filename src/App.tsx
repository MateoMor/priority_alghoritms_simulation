import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Layout 
      title="Algoritmos de Prioridad"
      githubRepo="https://github.com/tu-usuario/algoritmos-prioridad"
    >
      <HomePage />
    </Layout>
  );
}

export default App;
