import './Footer.css'
function Footer() {
  return (
    <footer className="footer" aria-label="Site Footer">
      <p>
        &copy; {new Date().getFullYear()} Init Free Offers Hub &nbsp;|&nbsp;
        <a href="#">Privacy Policy</a> &nbsp;|&nbsp;
        <a href="#">Contact</a>
      </p>
      <p className="footer-powered">
        Powered by <a href="#" target="_blank" rel="noopener noreferrer">Init_AM</a>
      </p>
    </footer>
  )
}
export default Footer