import './ParticleBackground.css';

export default function ParticleBackground() {
  return (
    <div className="background-wrapper">
      <div className="gradient-blur gradient-blur-1" />
      <div className="gradient-blur gradient-blur-2" />
      <div className="gradient-blur gradient-blur-3" />
      <div className="gradient-mesh" />
    </div>
  );
}