import React from 'react';
import { Layers, Zap, Box, FileSpreadsheet } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function WhyUs() {
  const { t } = useApp();

  return (
    <section id="why-us" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('why.tag')}</div>
          <h2 className="section-title">{t('why.title')}</h2>
          <p className="section-desc">{t('why.desc')}</p>
        </div>

        <div className="why-grid">
          {/* Item 1 */}
          <div className="why-card">
            <div className="why-icon">
              <Layers style={{ width: 26, height: 26 }} />
            </div>
            <div className="why-card-content">
              <h3>{t('why.c1_title')}</h3>
              <p>{t('why.c1_desc')}</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="why-card">
            <div className="why-icon">
              <Zap style={{ width: 26, height: 26 }} />
            </div>
            <div className="why-card-content">
              <h3>{t('why.c2_title')}</h3>
              <p>{t('why.c2_desc')}</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="why-card">
            <div className="why-icon">
              <Box style={{ width: 26, height: 26 }} />
            </div>
            <div className="why-card-content">
              <h3>{t('why.c3_title')}</h3>
              <p>{t('why.c3_desc')}</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="why-card">
            <div className="why-icon">
              <FileSpreadsheet style={{ width: 26, height: 26 }} />
            </div>
            <div className="why-card-content">
              <h3>{t('why.c4_title')}</h3>
              <p>{t('why.c4_desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
