import styled from '@emotion/styled';
import LeftPanel from '@/features/login/components/LeftPanel';
import RightPanel from '@/features/login/components/RightPanel';

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100dvh;
  background-color: ${({ theme }) => theme.colors.gray.gray0};
`;

const Login = () => {
  return (
    <Container>
      <LeftPanel />
      <RightPanel />
    </Container>
  );
};

export default Login;
