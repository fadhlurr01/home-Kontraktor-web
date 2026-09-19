import React from 'react';
import { Calculator, Split, CloudSun, Box, Truck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import CostEstimator from './CostEstimator';
import BeforeAfterSlider from './BeforeAfterSlider';
import WeatherWidget from './WeatherWidget';
import BimViewer from './BimViewer';
import FleetMatrix from './FleetMatrix';

export default function WidgetsSection() {
  const { t, activeWidgetTab, setActiveWidgetTab } = useApp();

  return (
    <section id="widgets" className="scroll-reveal">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{t('wid.tag')}</div>
          <h2 className="section-title">{t('wid.title')}</h2>
          <p className="section-desc">{t('wid.desc')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="widget-tabs-nav">
          <button
            type="button"
            className={`widget-tab-btn ${activeWidgetTab === 'widget-calc' ? 'active' : ''}`}
            onClick={() => setActiveWidgetTab('widget-calc')}
          >
            <Calculator style={{ width: 18, height: 18 }} />
            <span>{t('wid.tab_calc')}</span>
          </button>
          <button
            type="button"
            className={`widget-tab-btn ${activeWidgetTab === 'widget-ba' ? 'active' : ''}`}
            onClick={() => setActiveWidgetTab('widget-ba')}
          >
            <Split style={{ width: 18, height: 18 }} />
            <span>{t('wid.tab_ba')}</span>
          </button>
          <button
            type="button"
            className={`widget-tab-btn ${activeWidgetTab === 'widget-weather' ? 'active' : ''}`}
            onClick={() => setActiveWidgetTab('widget-weather')}
          >
            <CloudSun style={{ width: 18, height: 18 }} />
            <span>{t('wid.tab_weather')}</span>
          </button>
          <button
            type="button"
            className={`widget-tab-btn ${activeWidgetTab === 'widget-tour' ? 'active' : ''}`}
            onClick={() => setActiveWidgetTab('widget-tour')}
          >
            <Box style={{ width: 18, height: 18 }} />
            <span>{t('wid.tab_tour')}</span>
          </button>
          <button
            type="button"
            className={`widget-tab-btn ${activeWidgetTab === 'widget-fleet' ? 'active' : ''}`}
            onClick={() => setActiveWidgetTab('widget-fleet')}
          >
            <Truck style={{ width: 18, height: 18 }} />
            <span>{t('wid.tab_fleet')}</span>
          </button>
        </div>

        {/* Panes Container */}
        <div className="widgets-container">
          <div className={`widget-pane ${activeWidgetTab === 'widget-calc' ? 'active' : ''}`}>
            <CostEstimator />
          </div>
          <div className={`widget-pane ${activeWidgetTab === 'widget-ba' ? 'active' : ''}`}>
            <BeforeAfterSlider />
          </div>
          <div className={`widget-pane ${activeWidgetTab === 'widget-weather' ? 'active' : ''}`}>
            <WeatherWidget />
          </div>
          <div className={`widget-pane ${activeWidgetTab === 'widget-tour' ? 'active' : ''}`}>
            <BimViewer />
          </div>
          <div className={`widget-pane ${activeWidgetTab === 'widget-fleet' ? 'active' : ''}`}>
            <FleetMatrix />
          </div>
        </div>
      </div>
    </section>
  );
}
