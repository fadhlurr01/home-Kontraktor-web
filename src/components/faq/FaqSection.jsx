import React, { useState } from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { faqData } from '../../data/faqData';

export default function FaqSection() {
  const { t, language } = useApp();
  const [activeTier, setActiveTier] = useState('all');
  const [openFaqId, setOpenFaqId] = useState(1);

  const filteredFaqs = faqData.filter(
    (item) => activeTier === 'all' || item.tier === activeTier
  );

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag pulse-pill-tag">
            <HelpCircle size={14} className="tag-icon-sparkle" />
            <span>{t('faq.tag')}</span>
          </div>
          <h2 className="section-title">
            Jawaban Lengkap untuk Semua <em>Tingkatan Kebutuhan</em>
          </h2>
        </div>

        {/* FAQ Tier Navigation */}
        <div className="faq-tier-nav">
          <button
            type="button"
            className={`faq-tier-btn ${activeTier === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTier('all')}
          >
            Semua Pertanyaan
          </button>
          <button
            type="button"
            className={`faq-tier-btn ${activeTier === 'awam' ? 'active' : ''}`}
            onClick={() => setActiveTier('awam')}
          >
            {t('faq.tab_awam')}
          </button>
          <button
            type="button"
            className={`faq-tier-btn ${activeTier === 'mid' ? 'active' : ''}`}
            onClick={() => setActiveTier('mid')}
          >
            {t('faq.tab_mid')}
          </button>
          <button
            type="button"
            className={`faq-tier-btn ${activeTier === 'expert' ? 'active' : ''}`}
            onClick={() => setActiveTier('expert')}
          >
            {t('faq.tab_expert')}
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list">
          {filteredFaqs.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? 'active' : ''}`}
                data-tier={item.tier}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(item.id)}
                >
                  <span className="faq-question-text">{language === 'en' ? item.q_en : item.q_id}</span>
                  <div className={`faq-toggle-circle ${isOpen ? 'active' : ''}`}>
                    <Plus
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="faq-answer-pane">
                    <p>{language === 'en' ? item.a_en : item.a_id}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
