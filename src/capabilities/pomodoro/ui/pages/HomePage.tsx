import { useEffect } from 'react';

import { Container } from '@/shared/components/Container';
import { MainTemplate } from '@/shared/templates/MainTemplate';

import { CountDown } from '../components/CountDown';
import { MainForm } from '../components/MainForm';

export function HomePage() {
  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}
