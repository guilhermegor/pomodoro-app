import { TaskContextProvider } from './capabilities/pomodoro';
import { MainRouter } from './routes/MainRouter';
import { MessagesContainer } from './shared/components/MessagesContainer';

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
