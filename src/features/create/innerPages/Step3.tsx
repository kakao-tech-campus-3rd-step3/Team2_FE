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

  return (
    <div>
      Step3
      {/* selectedFileId 상태 변경 UI 필요하면 여기에 구현 */}
    </div>
  );
};

export default Step3;
