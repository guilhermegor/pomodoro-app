import { useEffect } from 'react';

import { Container } from '@/shared/components/Container';
import { GenericHtml } from '@/shared/components/GenericHtml';
import { Heading } from '@/shared/components/Heading';
import { RouterLink } from '@/shared/components/RouterLink';
import { MainTemplate } from '@/shared/templates/MainTemplate';

export function AboutPomodoroPage() {
  useEffect(() => {
    document.title = 'Sobre o Pomodoro - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <Heading>A Técnica Pomodoro 🍅</Heading>
          <p>
            Metodologia criada por <strong>Francesco Cirillo</strong>: blocos de trabalho
            intercalados com pausas.
          </p>
          <h2>Nosso ciclo:</h2>
          <ul>
            <li>
              Ciclos <strong>ímpares</strong>: Foco.
            </li>
            <li>
              Ciclos <strong>pares</strong>: Descanso curto.
            </li>
            <li>
              Ciclo <strong>8</strong>: Descanso longo.
            </li>
          </ul>
          <p>
            Acesse as <RouterLink href="/settings/">configurações</RouterLink> para personalizar os
            tempos.
          </p>
          <p>
            <RouterLink href="/">Voltar para a página inicial</RouterLink>
          </p>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}
