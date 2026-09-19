import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { fleetUnits } from '../../data/fleetData';

export default function FleetMatrix() {
  const { t, openModal } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredUnits = fleetUnits.filter((unit) => {
    const matchesCat = activeCategory === 'all' || unit.cat === activeCategory;
    const matchesSearch =
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              marginBottom: '0.25rem'
            }}
          >
            {t('fleet.title')}
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {t('fleet.desc')}
          </p>
        </div>
        <input
          type="text"
          id="fleet-search-input"
          placeholder={t('fleet.search_ph')}
          className="form-input"
          style={{ maxWidth: '280px', padding: '0.5rem 1rem' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter Pills */}
      <div className="fleet-filters-bar">
        <button
          type="button"
          className={`fleet-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          {t('fleet.filter_all')}
        </button>
        <button
          type="button"
          className={`fleet-filter-btn ${activeCategory === 'crane' ? 'active' : ''}`}
          onClick={() => setActiveCategory('crane')}
        >
          {t('fleet.filter_crane')}
        </button>
        <button
          type="button"
          className={`fleet-filter-btn ${activeCategory === 'excavator' ? 'active' : ''}`}
          onClick={() => setActiveCategory('excavator')}
        >
          {t('fleet.filter_excavator')}
        </button>
        <button
          type="button"
          className={`fleet-filter-btn ${activeCategory === 'concrete' ? 'active' : ''}`}
          onClick={() => setActiveCategory('concrete')}
        >
          {t('fleet.filter_concrete')}
        </button>
      </div>

      {/* Equipment Table */}
      <div className="fleet-table-wrapper">
        <table className="fleet-table">
          <thead>
            <tr>
              <th>{t('fleet.th_code')}</th>
              <th>{t('fleet.th_name')}</th>
              <th>{t('fleet.th_cap')}</th>
              <th>{t('fleet.th_loc')}</th>
              <th>{t('fleet.th_status')}</th>
              <th>{t('fleet.th_action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map((unit) => {
              const isReady = unit.status.includes('READY');
              return (
                <tr key={unit.code}>
                  <td>
                    <code style={{ color: 'var(--accent-cyan)' }}>{unit.code}</code>
                  </td>
                  <td>
                    <strong>{unit.name}</strong>
                  </td>
                  <td>{unit.capacity}</td>
                  <td>{unit.location}</td>
                  <td>
                    <span className={isReady ? 'status-pill-ready' : 'status-pill-deployed'}>
                      {unit.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-mobilize-action"
                      onClick={() => openModal('fleet', unit)}
                    >
                      {isReady ? t('fleet.btn_mobilize') : t('fleet.btn_booking')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
