import React from 'react';
import { Sofa, Compass, HardHat, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SolutionsSection() {
  const { t } = useApp();

  return (
    <section id="solusi" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('sol.tag')}</div>
          <h2 className="section-title">{t('sol.title')}</h2>
          <p className="section-desc">{t('sol.desc')}</p>
        </div>

        <div className="solutions-grid">
          {/* Card 1: Interior Fit-out */}
          <div className="solution-card">
            <div className="card-num">{t('sol.c1_num')}</div>
            <div className="card-icon">
              <Sofa style={{ width: 26, height: 26 }} />
            </div>
            <h3 className="card-title">{t('sol.c1_title')}</h3>
            <p className="card-focus">{t('sol.c1_focus')}</p>
            <div className="card-features-title">FITUR UTAMA:</div>
            <ul className="card-features-list">
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('sol.c1_f1')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('sol.c1_f2')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('sol.c1_f3')}</span>
              </li>
            </ul>
            <a href="#portofolio" className="btn btn-secondary btn-block">
              <span>{t('sol.c1_btn')}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </a>
          </div>

          {/* Card 2: Architecture & Planning */}
          <div className="solution-card">
            <div className="card-num">{t('sol.c2_num')}</div>
            <div className="card-icon">
              <Compass style={{ width: 26, height: 26 }} />
            </div>
            <h3 className="card-title">{t('sol.c2_title')}</h3>
            <p className="card-focus">{t('sol.c2_focus')}</p>
            <div className="card-features-title">FITUR UTAMA:</div>
            <ul className="card-features-list">
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('sol.c2_f1')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('sol.c2_f2')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('sol.c2_f3')}</span>
              </li>
            </ul>
            <a href="#portofolio" className="btn btn-secondary btn-block">
              <span>{t('sol.c2_btn')}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </a>
          </div>

          {/* Card 3: Civil & EPC */}
          <div className="solution-card">
            <div className="card-num">{t('sol.c3_num')}</div>
            <div className="card-icon">
              <HardHat style={{ width: 26, height: 26 }} />
            </div>
            <h3 className="card-title">{t('sol.c3_title')}</h3>
            <p className="card-focus">{t('sol.c3_focus')}</p>
            <div className="card-features-title">FITUR UTAMA:</div>
            <ul className="card-features-list">
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('sol.c3_f1')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('sol.c3_f2')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('sol.c3_f3')}</span>
              </li>
            </ul>
            <a href="#portofolio" className="btn btn-secondary btn-block">
              <span>{t('sol.c3_btn')}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
