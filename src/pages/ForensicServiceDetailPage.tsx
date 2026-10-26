import React from 'react';
import { EditorialServiceDetailPage } from './EditorialServiceDetailPage';

interface ForensicServiceDetailPageProps {
  serviceId: string;
}

export const ForensicServiceDetailPage: React.FC<ForensicServiceDetailPageProps> = ({ serviceId }) => {
  return <EditorialServiceDetailPage serviceKey={serviceId} />;
};

export default ForensicServiceDetailPage;
