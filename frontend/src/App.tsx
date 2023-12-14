import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PowerGraph from './components/PowerGraph';
import MathExpression from './components/MathExpression';
import Container from '@mui/material/Container';
import CounterComponent from './components/CounterComponent';
import LoginForm from './components/auth_components/LoginForm';
import RegistrationForm from './components/auth_components/RegistrationForm';
import { SpeedInsights } from '@vercel/speed-insights/react';
import HomePage from './pages/HomePage';
import MainLayout from './components/layout/MainLayout';
import MtBrunoElevation from './components/graph_components/MtBrunoElevation';
// import './App.css

function App() {

  return (
      <Router>
        <MainLayout>
          <Container style={{ width: '100%' }}>
                <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/register" element={<RegistrationForm />} />
                      <Route path="/power" element={<PowerGraph />} />
                      <Route path="/bruno" element={<MtBrunoElevation />} />
                      <Route path="/math" element={<MathExpression />} />
                      <Route path="/counter" element={<CounterComponent />} />
                      {/* More routes */}
                  </Routes>
          </Container>
        </MainLayout>
        <SpeedInsights />
      </Router>
  );
}

export default App;
