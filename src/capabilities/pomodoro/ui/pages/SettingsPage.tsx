import { SaveIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Container } from '@/shared/components/Container';
import { DefaultButton } from '@/shared/components/DefaultButton';
import { DefaultInput } from '@/shared/components/DefaultInput';
import { Heading } from '@/shared/components/Heading';
import { MainTemplate } from '@/shared/templates/MainTemplate';

import { useChangeSettingsWithValidation } from '../../application/use-cases';
import { useTaskContext } from '../../use-task-context';

export function SettingsPage() {
  const { state, dispatch, notifier } = useTaskContext();
  const workRef = useRef<HTMLInputElement>(null);
  const shortRef = useRef<HTMLInputElement>(null);
  const longRef = useRef<HTMLInputElement>(null);
  const changeSettings = useChangeSettingsWithValidation(dispatch, notifier);

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    changeSettings(
      workRef.current?.value ?? '',
      shortRef.current?.value ?? '',
      longRef.current?.value ?? '',
    );
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <form onSubmit={handleSave} className="form">
          <div className="formRow">
            <DefaultInput
              id="workTime"
              labelText="Foco"
              ref={workRef}
              defaultValue={state.config.workTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="shortBreakTime"
              labelText="Descanso curto"
              ref={shortRef}
              defaultValue={state.config.shortBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput
              id="longBreakTime"
              labelText="Descanso longo"
              ref={longRef}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultButton icon={<SaveIcon />} aria-label="Salvar" title="Salvar" />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
