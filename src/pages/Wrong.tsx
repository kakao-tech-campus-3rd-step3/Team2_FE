import styled from '@emotion/styled';
import PageLayout from '@/shared/components/Layout/PageLayout';
import WrongNoteListItem from '@/features/wrong/components/WrongNoteListItem';

import api from '@/shared/api/axiosClient';
import { useQuery } from '@tanstack/react-query';
import type { WrongNoteSetResponse } from '@/features/wrong/types/wrongNote';
import { useState, useEffect } from 'react';

const WrongWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`;
const WrongPageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const WrongPageTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;

const WrongPageDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.subtitle2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

// 검색바 부분
const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.spacing7};
  margin-bottom: ${({ theme }) => theme.spacing.spacing7};
`;

const SearchBarDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

const SearchBar = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray4};
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  padding: ${({ theme }) => theme.spacing.spacing1};
`;

// 오답노트 리스트 부분
const WrongNoteList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray5};
  border-radius: ${({ theme }) => theme.radius.radius2};
`;

const WrongNoteListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WrongNoteListHeaderColumn = styled.span`
  padding: ${({ theme }) => theme.spacing.spacing4};
  font-size: ${({ theme }) => theme.typography.label2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label2Regular.lineHeight};
`;

function Wrong() {
  const { isPending, error, data } = useQuery({
    queryKey: ['wrongNoteSet', 'wrongNoteSetId'],
    queryFn: async () => {
      const res = await api.get<WrongNoteSetResponse>(`/wrong-answers/all`);
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const normalize = (str: string) => str.toLowerCase().normalize('NFC').replace(/\s+/g, '');

  const filteredQuestionSets = data?.filter((item) =>
    normalize(item.questionSetTitle).includes(normalize(debouncedSearchTerm)),
  );

  // 로딩
  if (isPending) return <h1>Loading...</h1>;
  // 에러
  if (error) return <h1>Error</h1>;

  return (
    <PageLayout>
      <WrongWrapper>
        <ContentWrapper>
          <WrongPageTitleWrapper>
            <WrongPageTitle>오답노트</WrongPageTitle>
          </WrongPageTitleWrapper>
          <WrongPageDescription>
            문제집별로 틀린 문제를 분석하고 완벽히 이해할 때까지 학습하세요
          </WrongPageDescription>
          <SearchBarWrapper>
            <SearchBarDescription>
              {filteredQuestionSets?.length}개의 오답이 검색되었습니다
            </SearchBarDescription>
            <SearchBar
              placeholder="오답노트 제목으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBarWrapper>
          <WrongNoteList>
            <WrongNoteListHeader>
              <WrongNoteListHeaderColumn>문제집</WrongNoteListHeaderColumn>
              <WrongNoteListHeaderColumn>오답 수</WrongNoteListHeaderColumn>
              <WrongNoteListHeaderColumn>난이도</WrongNoteListHeaderColumn>
              <WrongNoteListHeaderColumn>카테고리</WrongNoteListHeaderColumn>
              <WrongNoteListHeaderColumn>작업</WrongNoteListHeaderColumn>
            </WrongNoteListHeader>
            {filteredQuestionSets?.map((item) => (
              <WrongNoteListItem key={item.questionSetId} item={item} />
            ))}
          </WrongNoteList>
        </ContentWrapper>
      </WrongWrapper>
    </PageLayout>
  );
}

export default Wrong;
