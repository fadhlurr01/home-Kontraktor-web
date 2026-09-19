import React from 'react';
import { useApp } from '../../context/AppContext';

export default function DigitalPillars() {
  const { t } = useApp();

  return (
    <section id="digital-presence" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('dp.tag')}</div>
          <h2 className="section-title">{t('dp.title')}</h2>
          <p className="section-desc">{t('dp.desc')}</p>
        </div>

        <div className="pillars-table-wrapper">
          <table className="pillars-grid-table">
            <thead>
              <tr>
                <th>{t('dp.th_pillar')}</th>
                <th>{t('dp.th_focus')}</th>
                <th>{t('dp.th_benefit')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="pillar-name-cell">
                    <span className="pillar-num">01</span>
                    <span>{t('dp.p1_name')}</span>
                  </div>
                </td>
                <td className="pillar-focus-cell">{t('dp.p1_focus')}</td>
                <td className="pillar-benefit-cell">
                  {t('dp.p1_benefit')}
                </td>
              </tr>
              <tr>
                <td>
                  <div className="pillar-name-cell">
                    <span className="pillar-num">02</span>
                    <span>{t('dp.p2_name')}</span>
                  </div>
                </td>
                <td className="pillar-focus-cell">{t('dp.p2_focus')}</td>
                <td className="pillar-benefit-cell">
                  {t('dp.p2_benefit')}
                </td>
              </tr>
              <tr>
                <td>
                  <div className="pillar-name-cell">
                    <span className="pillar-num">03</span>
                    <span>{t('dp.p3_name')}</span>
                  </div>
                </td>
                <td className="pillar-focus-cell">{t('dp.p3_focus')}</td>
                <td className="pillar-benefit-cell">
                  {t('dp.p3_benefit')}
                </td>
              </tr>
              <tr>
                <td>
                  <div className="pillar-name-cell">
                    <span className="pillar-num">04</span>
                    <span>{t('dp.p4_name')}</span>
                  </div>
                </td>
                <td className="pillar-focus-cell">{t('dp.p4_focus')}</td>
                <td className="pillar-benefit-cell">
                  {t('dp.p4_benefit')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
