import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import { ThemeProvider } from './utils/theme';
import { connect } from 'react-redux';
import store from './store/appStore';

function App() {
  return (
    <ThemeProvider>
      <Home/>
    </ThemeProvider>
  )
}

export default connect(store=>store)(App);
