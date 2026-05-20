import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';

import {
  AboutPomodoroPage,
  HistoryPage,
  HomePage,
  NotFoundPage,
  SettingsPage,
} from '@/capabilities/pomodoro';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

// Webpack's DefinePlugin inlines PUBLIC_PATH at build time. react-router
// rejects a trailing slash on basename, so strip it; '/' (local dev) → ''.
const basename = (process.env.PUBLIC_PATH || '/').replace(/\/$/, '');

export function MainRouter() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history/" element={<HistoryPage />} />
        <Route path="/settings/" element={<SettingsPage />} />
        <Route path="/about-pomodoro/" element={<AboutPomodoroPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
