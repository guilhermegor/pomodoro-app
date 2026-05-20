import * as PomodoroCapability from './index';

describe('pomodoro capability public surface', () => {
  it('exports exactly the documented public API', () => {
    const exported = Object.keys(PomodoroCapability).sort();
    expect(exported).toEqual([
      'AboutPomodoroPage',
      'HistoryPage',
      'HomePage',
      'NotFoundPage',
      'SettingsPage',
      'TaskContextProvider',
    ]);
  });
});
