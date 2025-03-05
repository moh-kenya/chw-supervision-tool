import React from 'react';
import { Card, Typography, Button, Descriptions } from 'antd';

const { Title } = Typography;

const ReviewCHA = ({ formData, onPrevious, onSubmit }) => {
  const sections = [
    {
      title: 'Leadership & Governance',
      data: formData.leadership || {}
    },
    {
      title: 'Workforce',
      data: formData.workforce || {}
    },
    {
      title: 'Infrastructure',
      data: formData.infrastructure || {}
    },
    {
      title: 'Finance',
      data: formData.finance || {}
    },
    {
      title: 'Transport',
      data: formData.transport || {}
    },
    {
      title: 'Commodities',
      data: formData.commodities || {}
    },
    {
      title: 'Referral',
      data: formData.referral || {}
    },
    {
      title: 'Service Delivery',
      data: formData.serviceDelivery || {}
    },
    {
      title: 'Pandemic Preparedness',
      data: formData.pandemic || {}
    }
  ];

  const formatValue = (value) => {
    if (value === undefined || value === null) return 'Not provided';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'number') return value.toString();
    return value;
  };

  return (
    <div className="container mx-auto px-4">
      <Title level={2}>Review CHA Assessment</Title>
      
      {sections.map((section, index) => (
        <Card key={index} title={section.title} className="mb-6">
          <Descriptions bordered column={1}>
            {Object.entries(section.data).map(([key, value]) => (
              <Descriptions.Item 
                key={key} 
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              >
                {formatValue(value)}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Card>
      ))}

      <div className="flex justify-between mt-6 mb-12">
        <Button type="default" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="primary" onClick={onSubmit}>
          Submit Assessment
        </Button>
      </div>
    </div>
  );
};

export default ReviewCHA;
