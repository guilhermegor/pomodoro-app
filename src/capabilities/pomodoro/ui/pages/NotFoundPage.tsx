import { useEffect } from 'react';

import { Container } from '@/shared/components/Container';
import { GenericHtml } from '@/shared/components/GenericHtml';
import { Heading } from '@/shared/components/Heading';
import { RouterLink } from '@/shared/components/RouterLink';
import { MainTemplate } from '@/shared/templates/MainTemplate';

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <Heading>404 - Página não encontrada</Heading>
          <p>
            Volte para a <RouterLink href="/">página inicial</RouterLink>.
          </p>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}
