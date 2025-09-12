import React, { useState, useEffect } from 'react';

interface Step3Props {
  onValidChange: (isValid: boolean) => void;
}

const Step3: React.FC<Step3Props> = ({ onValidChange }) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  useEffect(() => {
    // 예시: selectedFileId가 있으면 유효(true), 없으면 false
    onValidChange(!!selectedFileId);
  }, [selectedFileId, onValidChange]);

   // 현재는 다음 페이지가 비활성화되기에 set을 할 필요는 없으나, vercel 배포에서 에러를 내므로 임시로 사용 => 추후 수정 필요
    useEffect(()=>{
      setSelectedFileId(null);
    },[]);
    
  return (
    <div>
      Step3
      {/* selectedFileId 상태 변경 UI 필요하면 여기에 구현 */}
    </div>
  );
};

export default Step3;
