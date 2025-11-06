import styled from '@emotion/styled';
import type { LucideIcon } from 'lucide-react';

interface IconWrapperProps {
  bgColor: string;
  iconColor: string;
}

const IconWrapper = styled.div<IconWrapperProps>`
  width: 32px;
  height: 32px;
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.radius2};
  color: ${({ iconColor }) => iconColor};
`;

const Card = styled.div`
  width: 24%;
  height: 175px;
  background-color: ${({ theme }) => theme.colors.gray.gray0};
  border-radius: ${({ theme }) => theme.radius.radius3};
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.spacing5};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing4};

  @media (max-width: 1050px), (max-height: 400px) {
    width: calc(50% - ${({ theme }) => theme.spacing.spacing3} / 2);
    min-width: 0;
  }
`;

const Count = styled.span`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  color: ${({ theme }) => theme.colors.gray.gray7};
`;

interface StatsCardProps {
  icon: LucideIcon;
  count: number;
  description: string;
  bgColor: string;
  iconColor: string;
}

function StatsCard({ icon: Icon, count, description, bgColor, iconColor }: StatsCardProps) {
  return (
    <Card>
      <IconWrapper bgColor={bgColor} iconColor={iconColor}>
        <Icon size={20} />
      </IconWrapper>
      <Count>{count}</Count>
      <Description>{description}</Description>
    </Card>
  );
}

export default StatsCard;
