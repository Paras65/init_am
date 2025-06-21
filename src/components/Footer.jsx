import './Footer.css'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer" aria-label="Site Footer">
      <p>
        &copy; {new Date().getFullYear()} Init Free Offers Hub &nbsp;|&nbsp;
        <Link to="/privacy">Privacy Policy</Link> &nbsp;|&nbsp;
        <a href="#">Contact</a>
      </p>
      <p className="footer-powered">
        Powered by <a href="#" target="_blank" rel="noopener noreferrer">Init_AM</a>
      </p>
    </footer>
  )
}
export default Footer