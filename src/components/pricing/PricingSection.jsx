import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PricingSection() {
  const { t, currency, openModal } = useApp();

  return (
    <section id="pricing" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('price.tag')}</div>
          <h2 className="section-title">{t('price.title')}</h2>
          <p className="section-desc">{t('price.desc')}</p>
        </div>

        <div className="pricing-grid">
          {/* Tier 1: Starter */}
          <div className="pricing-card">
            <div className="pricing-tier">{t('price.t1_name')}</div>
            <div className="pricing-target">{t('price.t1_desc')}</div>

            <div className="pricing-price-box">
              <span className="price-currency">
                {currency === 'USD' ? '$' : 'Rp '}
              </span>
              <span className="price-amount">
                {currency === 'USD' ? '350' : '4.9 Jt'}
              </span>
              <span className="price-period"> / lisensi web</span>
            </div>

            <ul className="pricing-features-list">
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t1_f1')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t1_f2')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t1_f3')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t1_f4')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t1_f5')}</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => openModal('consult')}
            >
              <span>{t('price.t1_btn')}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Tier 2: Featured Professional */}
          <div className="pricing-card featured">
            <div className="popular-badge">{t('price.t2_popular')}</div>
            <div className="pricing-tier">{t('price.t2_name')}</div>
            <div className="pricing-target">{t('price.t2_desc')}</div>

            <div className="pricing-price-box">
              <span className="price-currency">
                {currency === 'USD' ? '$' : 'Rp '}
              </span>
              <span className="price-amount">
                {currency === 'USD' ? '690' : '9.8 Jt'}
              </span>
              <span className="price-period"> / lisensi pro</span>
            </div>

            <ul className="pricing-features-list">
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t2_f1')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t2_f2')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t2_f3')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t2_f4')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t2_f5')}</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => openModal('consult')}
            >
              <span>{t('price.t2_btn')}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Tier 3: Corporate */}
          <div className="pricing-card">
            <div className="pricing-tier">{t('price.t3_name')}</div>
            <div className="pricing-target">{t('price.t3_desc')}</div>

            <div className="pricing-price-box">
              <span className="price-currency">
                {currency === 'USD' ? '$' : 'Rp '}
              </span>
              <span className="price-amount">
                {currency === 'USD' ? '1,650' : '24.5 Jt'}
              </span>
              <span className="price-period"> / corporate</span>
            </div>

            <ul className="pricing-features-list">
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t3_f1')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t3_f2')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t3_f3')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t3_f4')}</span>
              </li>
              <li>
                <Check style={{ width: 16, height: 16 }} />
                <span>{t('price.t3_f5')}</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => openModal('consult')}
            >
              <span>{t('price.t3_btn')}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
