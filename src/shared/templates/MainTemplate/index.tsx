import { Container } from '@/shared/components/Container';
import { Footer } from '@/shared/components/Footer';
import { Logo } from '@/shared/components/Logo';
import { Menu } from '@/shared/components/Menu';

type MainTemplateProps = { children: React.ReactNode };

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>
      {children}
      <Container>
        <Footer />
      </Container>
    </>
  );
}
