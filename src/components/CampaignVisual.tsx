import { ArrowUpRight, Gauge, MousePointerClick, Orbit } from 'lucide-react';

const bars = [46, 68, 54, 82, 63, 92, 76];

export function CampaignVisual() {
  return (
    <div className="campaign-visual" aria-label="Abstract campaign performance visual">
      <div className="visual-header">
        <span>Growth command view</span>
        <span className="status-dot">Live</span>
      </div>

      <div className="visual-main">
        <div className="metric-panel">
          <div className="metric-panel__icon">
            <ArrowUpRight size={18} />
          </div>
          <span>Blended ROAS</span>
          <strong>4.2x</strong>
          <small>Average across D2C clients</small>
        </div>

        <div className="radial-card">
          <div className="radial-orbit">
            <Orbit size={32} />
          </div>
          <span>Audience signals</span>
          <strong>4-6%</strong>
          <small>LinkedIn engagement range</small>
        </div>
      </div>

      <div className="bar-grid" aria-hidden="true">
        {bars.map((height, index) => (
          <span key={index} style={{ '--bar-height': `${height}%` } as React.CSSProperties} />
        ))}
      </div>

      <div className="visual-footer">
        <span>
          <Gauge size={16} />
          Attribution aligned
        </span>
        <span>
          <MousePointerClick size={16} />
          Creative loop active
        </span>
      </div>
    </div>
  );
}
