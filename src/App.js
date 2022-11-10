import './App.scss';
import { BrowserRouter} from 'react-router-dom';
import 'swiper/swiper.min.css';
import Contents from './config/Contents'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <BrowserRouter>
        <>
          <Header />
          <Contents />
          <Footer />
        </>
    </BrowserRouter>
  );
}

export default App;
