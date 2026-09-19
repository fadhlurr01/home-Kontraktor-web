import React from 'react';
import { useApp } from '../../context/AppContext';

export default function GrowthJourney() {
  const { t } = useApp();

  return (
    <section id="growth-journey" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('growth.tag')}</div>
          <h2 className="section-title">{t('growth.title')}</h2>
          <p className="section-desc">{t('growth.desc')}</p>
        </div>

        <div className="vertical-workflow-stream">
          {/* Step 1 */}
          <div className="v-stream-step">
            <div className="v-stream-node">
              <div className="v-node-circle">01</div>
              <div className="v-node-line"></div>
            </div>
            <div className="v-stream-content">
              <div>
                <span className="v-step-phase">{t('growth.s1_phase')}</span>
                <h3 className="v-step-title">{t('growth.s1_title')}</h3>
                <p className="v-step-desc">{t('growth.s1_desc')}</p>
                <div className="flow-deliverables-group">
                  <span className="flow-deliv-tag">✓ Scope Matrix</span>
                  <span className="flow-deliv-tag">✓ Target Persona</span>
                  <span className="flow-deliv-tag">✓ Sitemap CAD</span>
                </div>
              </div>
              <div className="flow-hud-box">
                <div className="flow-hud-header">
                  <span>PHASE 01</span>
                  <span>EST. 2-3 HARI</span>
                </div>
                <div className="flow-hud-value">100%</div>
                <div className="flow-hud-badge">BLUEPRINT READY</div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="v-stream-step">
            <div className="v-stream-node">
              <div className="v-node-circle">02</div>
              <div className="v-node-line"></div>
            </div>
            <div className="v-stream-content">
              <div>
                <span className="v-step-phase">{t('growth.s2_phase')}</span>
                <h3 className="v-step-title">{t('growth.s2_title')}</h3>
                <p className="v-step-desc">{t('growth.s2_desc')}</p>
                <div className="flow-deliverables-group">
                  <span className="flow-deliv-tag">✓ High-Fidelity UI</span>
                  <span className="flow-deliv-tag">✓ 3D Asset Modeling</span>
                  <span className="flow-deliv-tag">✓ Design Token System</span>
                </div>
              </div>
              <div className="flow-hud-box">
                <div className="flow-hud-header">
                  <span>PHASE 02</span>
                  <span>EST. 4-6 HARI</span>
                </div>
                <div className="flow-hud-value">LOD 350</div>
                <div className="flow-hud-badge">PROTOTYPE APPROVED</div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="v-stream-step">
            <div className="v-stream-node">
              <div className="v-node-circle">03</div>
              <div className="v-node-line"></div>
            </div>
            <div className="v-stream-content">
              <div>
                <span className="v-step-phase">{t('growth.s3_phase')}</span>
                <h3 className="v-step-title">{t('growth.s3_title')}</h3>
                <p className="v-step-desc">{t('growth.s3_desc')}</p>
                <div className="flow-deliverables-group">
                  <span className="flow-deliv-tag">✓ React Components</span>
                  <span className="flow-deliv-tag">✓ Three.js WebGL Engine</span>
                  <span className="flow-deliv-tag">✓ Estimator Calculator</span>
                </div>
              </div>
              <div className="flow-hud-box">
                <div className="flow-hud-header">
                  <span>PHASE 03</span>
                  <span>EST. 5-7 HARI</span>
                </div>
                <div className="flow-hud-value">60 FPS</div>
                <div className="flow-hud-badge">CLEAN REACT BUILD</div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="v-stream-step">
            <div className="v-stream-node">
              <div className="v-node-circle">04</div>
            </div>
            <div className="v-stream-content">
              <div>
                <span className="v-step-phase">{t('growth.s4_phase')}</span>
                <h3 className="v-step-title">{t('growth.s4_title')}</h3>
                <p className="v-step-desc">{t('growth.s4_desc')}</p>
                <div className="flow-deliverables-group">
                  <span className="flow-deliv-tag">✓ Google PageSpeed 95+</span>
                  <span className="flow-deliv-tag">✓ cPanel .htaccess Setup</span>
                  <span className="flow-deliv-tag">✓ Handover Dokumentasi</span>
                </div>
              </div>
              <div className="flow-hud-box">
                <div className="flow-hud-header">
                  <span>PHASE 04</span>
                  <span>GO LIVE</span>
                </div>
                <div className="flow-hud-value">99.9%</div>
                <div className="flow-hud-badge">PRODUCTION READY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
