import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import {
  AboutPomodoroPage,
  HistoryPage,
  HomePage,
  NotFoundPage,
  SettingsPage,
  TaskContextProvider,
} from '@/capabilities/pomodoro';

function renderAt(path: string) {
  return render(
    <TaskContextProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history/" element={<HistoryPage />} />
          <Route path="/settings/" element={<SettingsPage />} />
          <Route path="/about-pomodoro/" element={<AboutPomodoroPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    </TaskContextProvider>,
  );
}

describe('MainRouter', () => {
  it('renders HomePage (CountDown) at /', () => {
    renderAt('/');
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it.each([
    ['/history/', /Histórico/i],
    ['/settings/', /Configurações/i],
    ['/about-pomodoro/', /A Técnica Pomodoro/i],
    ['/nonexistent', /404/],
  ])('renders the right page heading at %s', (path, expected) => {
    renderAt(path);
    expect(screen.getByRole('heading', { name: expected })).toBeInTheDocument();
  });
});
