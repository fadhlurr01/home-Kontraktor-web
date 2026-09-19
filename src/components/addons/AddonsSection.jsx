import React from 'react';
import { useApp } from '../../context/AppContext';

export default function AddonsSection() {
  const { t } = useApp();

  return (
    <section id="addons" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('addon.tag')}</div>
          <h2 className="section-title">{t('addon.title')}</h2>
          <p className="section-desc">{t('addon.desc')}</p>
        </div>

        <div className="addons-grid">
          {/* Add-on 01 */}
          <div className="addon-card">
            <div className="addon-num">ADD-ON 01</div>
            <h3 className="addon-title">{t('addon.a1_title')}</h3>
            <p className="addon-desc">{t('addon.a1_desc')}</p>
          </div>

          {/* Add-on 02 */}
          <div className="addon-card">
            <div className="addon-num">ADD-ON 02</div>
            <h3 className="addon-title">{t('addon.a2_title')}</h3>
            <p className="addon-desc">{t('addon.a2_desc')}</p>
          </div>

          {/* Add-on 03 */}
          <div className="addon-card">
            <div className="addon-num">ADD-ON 03</div>
            <h3 className="addon-title">{t('addon.a3_title')}</h3>
            <p className="addon-desc">{t('addon.a3_desc')}</p>
          </div>

          {/* Add-on 04 */}
          <div className="addon-card">
            <div className="addon-num">ADD-ON 04</div>
            <h3 className="addon-title">{t('addon.a4_title')}</h3>
            <p className="addon-desc">{t('addon.a4_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
