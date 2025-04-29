import './Loaders.scss';

export function SpinnerLoader() {
  return <div className="spinner-loader" aria-label="Loading" />;
}

export function PulseLoader() {
  return (
    <div className="pulse-loader" aria-label="Loading">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
}

export function BarLoader() {
  return (
    <div className="bar-loader" aria-label="Loading">
      <div className="bar" />
    </div>
  );
}

export function RippleLoader() {
  return (
    <div className="ripple-loader" aria-label="Loading">
      <div className="circle" />
      <div className="circle" />
    </div>
  );
}

export function BouncingDotsLoader() {
  return (
    <div className="bouncing-dots-loader" aria-label="Loading">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
}
