import styled from '@emotion/styled';
import LibraryTitle from '@/features/library/innerPages/LibraryTitle';
import LibraryProgressSummary from '@/features/library/components/LibraryProgressSummary';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/shared/api/axiosClient';
import Spacer from '@/shared/components/Spacer';
import {
  type MyQuestionSetsResponse,
  type QuestionType,
} from '@/features/library/types/questionSetResponse';
import EditIcon from '@/shared/assets/EditIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/shared/components/Spinner';

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
  grid-template-columns: 3fr 1fr 1.2fr 1fr 1fr 1fr 1.2fr;
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

type QuestionSetStatus = 'PENDING' | 'COMPLETE';

const StatusCell = styled(ListCell)<{ status: QuestionSetStatus }>`
  font-weight: 500;
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
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
`;

const TitleText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleEditInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 4px 8px;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  border-radius: ${({ theme }) => theme.radius.radius2};
  background-color: ${({ theme }) => theme.colors.background.foreground};
  width: 100%;
  flex-grow: 1;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;

const EditIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.default};

  &:hover {
    color: ${({ theme }) => theme.colors.semantic.primary};
  }
`;

const TYPE_MAP: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: '객관식',
  SHORT_ANSWER: '단답형',
  TRUE_FALSE: '참/거짓',
};

const STATUS_MAP: Record<QuestionSetStatus, string> = {
  PENDING: '생성 중',
  COMPLETE: '생성완료',
};

interface QuestionSetApiResponse {
  content: (MyQuestionSetsResponse & { status: QuestionSetStatus })[];
  nextCursor: number;
  hasNext: boolean;
  size: number;
}

const Library = () => {
  const totalCount = 5;
  const completedCount = 1;

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateTitleMutation = useMutation({
    mutationFn: ({ id, title }: { id: number | undefined; title: string }) => {
      if (id === undefined || id === null) {
        throw new Error('문제집 ID가 없어 제목을 수정할 수 없습니다.');
      }
      if (!title.trim()) {
        throw new Error('제목은 비워둘 수 없습니다.');
      }
      return api.patch(`/question-set/${id}`, { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionSets'] });
      setEditingItemId(null);
      setEditingTitle('');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return api.delete(`/question-set/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionSets'] });
    },
    onError: (error) => {
      alert(`삭제 중 에러가 발생했습니다: ${error.message}`);
    },
  });

  const submitTitleEdit = (item: MyQuestionSetsResponse) => {
    updateTitleMutation.mutate({
      id: item.questionSetId,
      title: editingTitle,
    });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const { isPending, error, data } = useQuery({
    queryKey: ['questionSets'],
    queryFn: async () => {
      const res = await api.get<QuestionSetApiResponse>(`/question-set`);
      return res.data.content;
    },
    // 생성 중('PENDING') 상태인 항목이 있을 경우 5초마다 데이터를 다시 가져옵니다.
    refetchInterval: (query) =>
      query.state.data?.some((item) => item.status === 'PENDING') ? 5000 : false,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <span>에러가 발생했습니다: {error.message}</span>;
  }

  const filteredQuestionSets = data.filter((item) =>
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
        <ListBox>
          <ListRow>
            <HeaderCell align="left">문제집</HeaderCell>
            <HeaderCell>문제 수</HeaderCell>
            <HeaderCell>생성일</HeaderCell>
            <HeaderCell>유형</HeaderCell>
            <HeaderCell>상태</HeaderCell>
            <HeaderCell>문제풀기</HeaderCell>
            <HeaderCell>작업</HeaderCell>
          </ListRow>

          {[...filteredQuestionSets]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 시간 내림차순
            .map((item) => {
              const isEditing = editingItemId === item.questionSetId;
              return (
                <ListRow key={item.questionSetId}>
                  <ListCell align="left">
                    {isEditing ? (
                      <TitleContainer>
                        {/* TODO: callback 따로 빼기*/}
                        <TitleEditInput
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              submitTitleEdit(item);
                            }
                            if (e.key === 'Escape') {
                              setEditingItemId(null);
                            }
                          }}
                          autoFocus
                        />
                        <div>
                          <EditIconButton onClick={() => submitTitleEdit(item)}>✔️</EditIconButton>
                          <EditIconButton onClick={() => setEditingItemId(null)}>❌</EditIconButton>
                        </div>
                      </TitleContainer>
                    ) : (
                      <TitleContainer>
                        <TitleText title={item.title}>{item.title}</TitleText>
                        <EditIconButton
                          onClick={() => {
                            setEditingItemId(item.questionSetId);
                            setEditingTitle(item.title);
                          }}
                        >
                          <EditIcon />
                        </EditIconButton>
                      </TitleContainer>
                    )}
                  </ListCell>
                  <ListCell>{item.questionCount}</ListCell>
                  <ListCell>
                    {new Intl.DateTimeFormat('sv-SE').format(new Date(item.createdAt))}
                  </ListCell>
                  <ListCell>{TYPE_MAP[item.questionType] ?? '알 수 없음'}</ListCell>
                  <StatusCell status={item.status}>
                    {STATUS_MAP[item.status] ?? '알 수 없음'}
                  </StatusCell>
                  <ListCell>
                    {item.status === 'COMPLETE' && (
                      <PrimaryButton onClick={() => navigate(`/solve/${item.questionSetId}`)}>
                        풀기
                      </PrimaryButton>
                    )}
                  </ListCell>
                  <ListCell>
                    {item.status === 'COMPLETE' && (
                      <ActionsContainer>
                        <ActionButton
                          onClick={() => {
                            if (window.confirm(`'${item.title}' 문제집을 정말 삭제하시겠습니까?`)) {
                              deleteMutation.mutate(item.questionSetId);
                            }
                          }}
                        >
                          삭제
                        </ActionButton>
                      </ActionsContainer>
                    )}
                  </ListCell>
                </ListRow>
              );
            })}
        </ListBox>
      </LibraryWrapper>
    </Container>
  );
};

export default Library;
