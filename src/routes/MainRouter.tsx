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

export function MainRouter() {
  return (
    <BrowserRouter>
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
