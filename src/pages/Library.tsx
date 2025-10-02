import styled from '@emotion/styled';
import LibraryTitle from '@/features/library/innerPages/LibraryTitle';
import LibraryProgressSummary from '@/features/library/components/LibraryProgressSummary';
import { useState, useEffect } from 'react';
import Spacer from '@/shared/components/Spacer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.background};
  height: calc(100dvh - 76px);
  overflow-y: auto;
  box-sizing: border-box;
  justify-content: flex-start;
`;

const LibraryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
`;

const FileListSearchInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 12px 16px;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  border-radius: ${({ theme }) => theme.radius.radius3};
  background-color: ${({ theme }) => theme.colors.background.foreground};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radius.radius4};
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ListRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1fr 1.5fr;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.border1};
  transition: background-color 0.2s ease-in-out;

  &:last-of-type {
    border-bottom: none;
  }

  &:not(:first-of-type):hover {
    background-color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;

const ListCell = styled.div<{ align?: 'left' | 'center' | 'right' }>`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  color: ${({ theme }) => theme.colors.text.default};
  text-align: ${({ align }) => align || 'center'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderCell = styled(ListCell)`
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const ActionButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  background-color: white;
  color: ${({ theme }) => theme.colors.text.default};
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radius.radius2};
  font-size: ${({ theme }) => theme.typography.body3Regular.fontSize};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.semantic.primary};
    border-color: ${({ theme }) => theme.colors.semantic.primary};
    color: white;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.semantic.primary};
  border-color: ${({ theme }) => theme.colors.semantic.primary};
  color: white;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.colors.semantic.primary};
    border-color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;

const Library = () => {
  const totalCount = 5;
  const completedCount = 1;

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const questionSets = [
    { id: 1, title: '네트워크 기초 개념 문제집', count: 25, date: '2025-10-01' },
    { id: 2, title: '자료구조 핵심 요약', count: 15, date: '2025-09-28' },
    { id: 3, title: '리액트 상태관리 심화', count: 30, date: '2025-09-25' },
    { id: 4, title: '운영체제(OS) 101', count: 20, date: '2025-09-22' },
    { id: 5, title: '데이터베이스 정규화 과정', count: 10, date: '2025-09-20' },
  ];

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const filteredQuestionSets = questionSets.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  );

  return (
    <Container>
      <LibraryWrapper>
        <LibraryTitle />
        <LibraryProgressSummary totalCount={totalCount} completedCount={completedCount} />
        <Spacer height="12px" />
        {/* 검색 input창 -> 디바운싱 구현되어 있습니다. */}
        <FileListSearchInput
          placeholder="문제집 제목으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Spacer height="12px" />
        {/* 여기에서 부터 리스트 박스입니다.*/}
        {/* 일단 작업하다 보니, mock 데이터로 구성해 두었습니다.*/}
        <ListBox>
          <ListRow>
            <HeaderCell align="left">문제집</HeaderCell>
            <HeaderCell>문제 수</HeaderCell>
            <HeaderCell>생성일</HeaderCell>
            <HeaderCell>문제풀기</HeaderCell>
            <HeaderCell>작업</HeaderCell>
          </ListRow>

          {filteredQuestionSets.map((item) => (
            <ListRow key={item.id}>
              <ListCell align="left" title={item.title}>
                {item.title}
              </ListCell>
              <ListCell>{item.count}</ListCell>
              <ListCell>{item.date}</ListCell>
              <ListCell>
                <PrimaryButton>풀기</PrimaryButton>
              </ListCell>
              <ListCell>
                <ActionsContainer>
                  <ActionButton>수정</ActionButton>
                  <ActionButton>삭제</ActionButton>
                </ActionsContainer>
              </ListCell>
            </ListRow>
          ))}
        </ListBox>
      </LibraryWrapper>
    </Container>
  );
};

export default Library;
