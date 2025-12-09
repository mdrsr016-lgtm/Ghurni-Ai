import './AnimatedButton.css';

const AnimatedButton = ({ children = "Create Account", onClick, type = "button" }) => {
  return (
    <button className="continue-application" onClick={onClick} type={type}>
      {/* Icon section */}
      <div>
        <div className="pencil"></div>
        <div className="folder">
          <div className="top">
            <svg viewBox="0 0 24 27">
              <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
            </svg>
          </div>
          <div className="paper"></div>
        </div>
      </div>

      {/* Button Text */}
      <span>{children}</span>

      {/* Arrow Icon */}
      <svg className="arrow"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 74 74"
      >
        <path
          fill="currentColor"
          d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
        ></path>
      </svg>
    </button>
  );
};

export default AnimatedButton;
