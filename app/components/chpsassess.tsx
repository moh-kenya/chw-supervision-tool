import React from 'react';
import { Form, Card } from 'antd';

const CHPAssessment = () => {
  const sections = [
    'leadership-governance',
    'workforce',
    'infrastructure',
    'chis-monitoring',
    'finance',
    'commodities',
    'referral',
    'service-delivery',
    'pandemic-preparedness',
  ];

  const sectionQuestions = {
    'leadership-governance': [
      {
        label: 'Are you involved in the annual work plan development process?',
        name: 'workPlan',
        type: 'radio',
      },
      {
        label: 'Number of CHPs trained',
        name: 'numCHPsTrained1',
        type: 'number',
      },
      {
        label: 'Number of CHPs not trained',
        name: 'numCHPsTrained2',
        type: 'number',
      },
      { label: 'Comments/Remarks', name: 'workPlanComments', type: 'textarea' },
    ],
    workforce: [
      {
        label: 'Have you all (CHPs) received the basic module training?',
        name: 'basicTraining',
        type: 'radio',
      },
      {
        label: 'Number of CHPs trained',
        name: 'numCHPsTrained',
        type: 'number',
      },
      {
        label: 'How often do you all receive the stipend?',
        name: 'stipendFrequency',
        type: 'radio',
      },
      {
        label: 'When was the last time you were paid the stipend?',
        name: 'lastStipendPayment',
        type: 'radio',
      },
    ],
    infrastructure: [
      {
        label: 'Do you have a CHU designated office?',
        name: 'chuOffice',
        type: 'radio',
      },
      {
        label: 'Do you have a functional smartphone?',
        name: 'smartphone',
        type: 'radio',
      },
      {
        label: 'Does your CU have a mechanism for repairing damaged phones?',
        name: 'repairMechanism',
        type: 'radio',
      },
      {
        label: 'Does your CU have a mechanism for replacing lost phones?',
        name: 'replaceMechanism',
        type: 'radio',
      },
      {
        label:
          'Can you synchronize data to eCHIS without using your personal data bundles?',
        name: 'echisSync',
        type: 'radio',
      },
      {
        label: 'Have you experienced any challenges with eCHIS?',
        name: 'echisChallenges',
        type: 'radio',
      },
      {
        label: 'What challenges have you faced?',
        name: 'echisChallengesDesc',
        type: 'textarea',
      },
    ],
    'chis-monitoring': [
      {
        label:
          'How frequently do you have review meetings with your supervisor?',
        name: 'reviewMeetings',
        type: 'radio',
      },
      {
        label: 'Have you all been supervised in the last quarter?',
        name: 'supervised',
        type: 'radio',
      },
      {
        label: 'How many were supervised?',
        name: 'numSupervised',
        type: 'number',
      },
      {
        label: 'How frequently were you supervised?',
        name: 'supervisionFrequency',
        type: 'radio',
      },
    ],
    finance: [
      {
        label:
          'Does the county fund your activities? (e.g., dialogue days/action)',
        name: 'countyFunding',
        type: 'radio',
      },
      { label: 'Comments', name: 'financeComments', type: 'textarea' },
    ],
    commodities: [
      { label: 'Do you all (CHPs) have kits?', name: 'chpKits', type: 'radio' },
      {
        label: 'How many of you are NOT kitted?',
        name: 'numNotKitted',
        type: 'number',
        condition: "chpKits === 'No'",
      },
      {
        label: 'Does your link health facility replenish your kits as needed?',
        name: 'replenishKits',
        type: 'radio',
      },
      {
        label: 'Functional Digital thermometer',
        name: 'digitalThermometer',
        type: 'radio',
      },
      { label: 'Functional BP Machine', name: 'bpMachine', type: 'radio' },
      { label: 'MUAC Tape', name: 'muacTape', type: 'radio' },
      {
        label: 'Glucometer & Glucometer strips',
        name: 'glucometer',
        type: 'radio',
      },
      {
        label: 'ORS-Zinc Co-Pack/ORS and Zinc',
        name: 'orsZinc',
        type: 'radio',
      },
      {
        label: 'Albendazole tablets/Suspension',
        name: 'albendazole',
        type: 'radio',
      },
      {
        label: 'Paracetamol tablets/Suspension',
        name: 'paracetamol',
        type: 'radio',
      },
      { label: 'Examination gloves', name: 'gloves', type: 'radio' },
      { label: 'Condoms (Male/Female)', name: 'condoms', type: 'radio' },
      {
        label: 'Malaria RDTs/Artemether/Lumefantrine (Malaria Zone)',
        name: 'malariaRDTs',
        type: 'radio',
        condition: 'inMalariaZone',
      },
      { label: 'Masks', name: 'masks', type: 'radio' },
      {
        label:
          'Have you experienced stockouts of the CHP Tracer Commodities in the last 3 months?',
        name: 'stockouts',
        type: 'radio',
      },
      {
        label: 'Comments/Remarks',
        name: 'commoditiesComments',
        type: 'textarea',
      },
    ],
    referral: [
      {
        label: 'Do you all (CHPs) have the referral tools (MoH 100)?',
        name: 'referralTools',
        type: 'radio',
      },
      {
        label: 'How many of you have the tools?',
        name: 'numReferralTools',
        type: 'number',
      },
    ],
    'service-delivery': [
      {
        label: 'Total Number of Households',
        name: 'totalHouseholds',
        type: 'number',
      },
      {
        label: 'Number of households registered in eCHIS',
        name: 'registeredHouseholds',
        type: 'number',
      },
      {
        label: 'Number of households visited last month',
        name: 'visitedHouseholds',
        type: 'number',
      },
      {
        label: 'Comments/Remarks',
        name: 'serviceDeliveryComments',
        type: 'textarea',
      },
    ],
    'pandemic-preparedness': [
      {
        label:
          'Presence of community communication channels for reporting pandemics (e.g., toll-free lines)',
        name: 'communicationChannels',
        type: 'radio',
      },
      {
        label:
          'Have you (CHPs) been trained on RCCE (Risk Communication and Community Engagement)?',
        name: 'rcceTraining',
        type: 'radio',
      },
      {
        label: 'How many of you (CHPs) have been trained on RCCE?',
        name: 'numRcceTrained',
        type: 'number',
      },
      { label: 'Comments/Remarks', name: 'pandemicComments', type: 'textarea' },
    ],
  };

  export default function Section() {
    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const section = sections[current];

    const next = async () => {
      try {
        await form.validateFields();
        if (current < sections.length - 1) {
          setCurrent(current + 1);
        } else {
          message.success('All sections completed!');
        }
      } catch (error) {
        message.error('Please complete all required fields before proceeding.');
      }
    };

    const prev = () => {
      if (current > 0) {
        setCurrent(current - 1);
      }
    };

    <div className="p-6 max-w-2xl mx-auto">
      <Title level={3} className="capitalize">
        {section.replace('-', ' ')}
      </Title>
      <Steps
        current={current}
        items={sections.map((s) => ({ key: s, title: s.replace('-', ' ') }))}
      />

      <Form layout="vertical" form={form} onFinish={next} key={section}>
        <Card>
          {sectionQuestions[section]?.map((question) => (
            <Form.Item
              key={question.name}
              label={question.label}
              name={question.name}
              rules={[
                { required: true, message: 'Please answer this question.' },
              ]}
            >
              {question.type === 'radio' ? (
                <RadioGroup>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </RadioGroup>
              ) : question.type === 'number' ? (
                <InputNumber className="w-full" min={0} />
              ) : (
                <TextArea rows={2} />
              )}
            </Form.Item>
          ))}
        </Card>

        <Row justify="space-between" className="mt-4">
          {current > 0 && (
            <Col>
              <Button onClick={prev}>Previous</Button>
            </Col>
          )}
          <Col>
            <Button type="primary" htmlType="submit">
              {current < sections.length - 1 ? 'Next' : 'Finish'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>;
  }
};
export default CHPAssessment;
