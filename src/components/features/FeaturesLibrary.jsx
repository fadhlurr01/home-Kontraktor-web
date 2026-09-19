import React from 'react';
import {
  Compass,
  Split,
  FileSpreadsheet,
  Palette,
  ShieldCheck,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FeaturesLibrary() {
  const { t, navigateToWidget, openModal } = useApp();

  return (
    <section id="fitur" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('feat.tag')}</div>
          <h2 className="section-title">{t('feat.title')}</h2>
          <p className="section-desc">{t('feat.desc')}</p>
        </div>

        <div className="features-library-grid">
          {/* Feature 1 */}
          <div className="feature-box">
            <div className="feature-icon-bar">
              <div className="feature-icon-circle">
                <Compass style={{ width: 22, height: 22 }} />
              </div>
              <span className="feature-status-tag">3D ENGINE</span>
            </div>
            <h3>{t('feat.f1_title')}</h3>
            <p>{t('feat.f1_desc')}</p>
            <button
              type="button"
              className="feature-preview-trigger"
              onClick={() => navigateToWidget('widget-tour')}
            >
              <span>Uji Coba di Smart Widget</span>
              <ArrowUpRight style={{ width: 14, height: 14 }} />
            </button>
          </div>

          {/* Feature 2 */}
          <div className="feature-box">
            <div className="feature-icon-bar">
              <div className="feature-icon-circle">
                <Split style={{ width: 22, height: 22 }} />
              </div>
              <span className="feature-status-tag">INTERACTIVE</span>
            </div>
            <h3>{t('feat.f2_title')}</h3>
            <p>{t('feat.f2_desc')}</p>
            <button
              type="button"
              className="feature-preview-trigger"
              onClick={() => navigateToWidget('widget-ba')}
            >
              <span>Uji Coba di Smart Widget</span>
              <ArrowUpRight style={{ width: 14, height: 14 }} />
            </button>
          </div>

          {/* Feature 3 */}
          <div className="feature-box">
            <div className="feature-icon-bar">
              <div className="feature-icon-circle">
                <FileSpreadsheet style={{ width: 22, height: 22 }} />
              </div>
              <span className="feature-status-tag">DOCUMENT</span>
            </div>
            <h3>{t('feat.f3_title')}</h3>
            <p>{t('feat.f3_desc')}</p>
            <button
              type="button"
              className="feature-preview-trigger"
              onClick={() => openModal('rfp')}
            >
              <span>Buka Form Tender RFP</span>
              <ArrowUpRight style={{ width: 14, height: 14 }} />
            </button>
          </div>

          {/* Feature 4 */}
          <div className="feature-box">
            <div className="feature-icon-bar">
              <div className="feature-icon-circle">
                <Palette style={{ width: 22, height: 22 }} />
              </div>
              <span className="feature-status-tag">CUSTOMIZER</span>
            </div>
            <h3>{t('feat.f4_title')}</h3>
            <p>{t('feat.f4_desc')}</p>
            <button
              type="button"
              className="feature-preview-trigger"
              onClick={() => navigateToWidget('widget-tour')}
            >
              <span>Uji Coba di Smart Widget</span>
              <ArrowUpRight style={{ width: 14, height: 14 }} />
            </button>
          </div>

          {/* Feature 5 */}
          <div className="feature-box">
            <div className="feature-icon-bar">
              <div className="feature-icon-circle">
                <ShieldCheck style={{ width: 22, height: 22 }} />
              </div>
              <span className="feature-status-tag">TELEMETRY</span>
            </div>
            <h3>{t('feat.f5_title')}</h3>
            <p>{t('feat.f5_desc')}</p>
            <button
              type="button"
              className="feature-preview-trigger"
              onClick={() => navigateToWidget('widget-weather')}
            >
              <span>Uji Coba di Smart Widget</span>
              <ArrowUpRight style={{ width: 14, height: 14 }} />
            </button>
          </div>

          {/* Feature 6 */}
          <div className="feature-box">
            <div className="feature-icon-bar">
              <div className="feature-icon-circle">
                <Clock style={{ width: 22, height: 22 }} />
              </div>
              <span className="feature-status-tag">LOGISTICS</span>
            </div>
            <h3>{t('feat.f6_title')}</h3>
            <p>{t('feat.f6_desc')}</p>
            <button
              type="button"
              className="feature-preview-trigger"
              onClick={() => navigateToWidget('widget-fleet')}
            >
              <span>Uji Coba di Smart Widget</span>
              <ArrowUpRight style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
