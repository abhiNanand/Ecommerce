
import './Loaders.scss';

export const SpinnerLoader = () => (
  <div className="spinner-loader" aria-label="Loading" />
);

export const PulseLoader = () => (
  <div className="pulse-loader" aria-label="Loading">
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
  </div>
);

export const BarLoader = () => (
  <div className="bar-loader" aria-label="Loading">
    <div className="bar" />
  </div>
);

export const RippleLoader = () => (
  <div className="ripple-loader" aria-label="Loading">
    <div className="circle" />
    <div className="circle" />
  </div>
);

export const BouncingDotsLoader = () => (
  <div className="bouncing-dots-loader" aria-label="Loading">
    <div className="dot" />
    <div className="dot" />
    <div className="dot" />
  </div>
);