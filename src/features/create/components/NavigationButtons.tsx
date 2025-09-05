import styled from '@emotion/styled';

const Hr = styled.hr`
  width: 100%;
  height: 1px;
  background-color: lightgrey;
  border: none;
  margin: 16px 0;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PrevButton = styled.button`
  background-color: transparent;
  border: 1px solid lightgrey;
  border-radius: 5px;
  font-size: 0.775rem;
  color: grey;
  width: 55px;
  padding: 5px;
  font-weight: bold;
`;

const NextButton = styled.button`
  background-color: #16a34a;
  border-radius: 5px;
  font-size: 0.775rem;
  color: white;
  width: 55px;
  padding: 5px;
  font-weight: bold;
`;

const NavigationButtons = () => {
  return (
    <>
      <Hr />
      <ButtonBox>
        <PrevButton>이전</PrevButton>
        <NextButton>다음</NextButton>
      </ButtonBox>
    </>
  );
};

export default NavigationButtons;
