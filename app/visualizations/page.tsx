'use client';

import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Button, Empty, Statistic, Tabs } from 'antd';
import { ArrowLeftOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { listSupervisionData, getSubmissionStats } from '../lib/server/database';
import { Bar, Pie, Line } from '@ant-design/plots';
import dayjs from 'dayjs';

export default function VisualizationsPage() {
  const [loading, setLoading] = useState(true);
  const [countyData, setCountyData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get all records for visualizations
        const [response, statistics] = await Promise.all([
          listSupervisionData(), // No pagination to get all records
          getSubmissionStats()
        ]);

        const submissions = response?.documents || [];

        // Process data for visualizations
        const countyStats = new Map();
        const statusStats = new Map();
        const timelineStats = new Map();
        
        submissions.forEach((submission: any) => {
          try {
            const formData = JSON.parse(submission.formData);
            // County stats
            let county = formData.locationDetails?.county || formData.superVisionTeam?.county;
            if (county) {
              // Format county name
              county = county.toLowerCase();
              const countyName = county.charAt(0).toUpperCase() + county.slice(1);
              countyStats.set(countyName, (countyStats.get(countyName) || 0) + 1);
              console.log('Processing county:', countyName);
            } else {
              console.log('No county found in submission:', submission.$id);
            }
            
            // Status stats
            const status = submission.status || 'unknown';
            statusStats.set(status, (statusStats.get(status) || 0) + 1);
            
            // Timeline stats (by month)
            const date = dayjs(submission.$createdAt).format('YYYY-MM');
            timelineStats.set(date, (timelineStats.get(date) || 0) + 1);
          } catch (e) {
            console.error('Error parsing submission:', e);
          }
        });

        setCountyData(Array.from(countyStats.entries())
          .map(([county, count]) => ({ county, count }))
          .sort((a, b) => b.count - a.count));

        setStatusData(Array.from(statusStats.entries())
          .map(([status, count]) => ({ status, count })));

        setTimelineData(Array.from(timelineStats.entries())
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()));

        setStats(statistics);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error loading analytics data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!loading && !stats?.totalSubmissions) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h1>No Data Available</h1>
        <p>Please submit some supervision forms first.</p>
        <Button type="primary" onClick={() => window.location.href = '/dashboard'}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>Supervision Analytics Dashboard</h1>
        <Button 
          onClick={() => window.location.href = '/dashboard'}
          icon={<ArrowLeftOutlined />}
        >
          Back to Dashboard
        </Button>
      </div>

      {/* Summary Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Submissions"
              value={stats?.totalSubmissions || 0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Counties Covered"
              value={countyData.length}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completed Forms"
              value={statusData.find(s => s.status === 'completed')?.count || 0}
              valueStyle={{ color: '#52c41a' }}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Draft Forms"
              value={statusData.find(s => s.status === 'draft')?.count || 0}
              valueStyle={{ color: '#faad14' }}
              prefix={<FallOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Charts */}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Geographic Distribution" key="1">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Submissions by County">
                {countyData.length > 0 ? (
                  <Bar
                    data={countyData}
                    xField="county"
                    yField="count"
                    label={{
                      position: 'middle',
                      style: { fill: '#fff' }
                    }}
                    xAxis={{
                      label: { autoRotate: true, style: { fontSize: 12 } }
                    }}
                    color="#1890ff"
                  />
                ) : (
                  <Empty description="No county data available" />
                )}
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Status Analysis" key="2">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Submissions by Status">
                {statusData.length > 0 ? (
                  <Pie
                    data={statusData}
                    angleField="count"
                    colorField="status"
                    radius={0.8}
                    label={{
                      type: 'spider',
                      content: '{name}: {percentage}'
                    }}
                    interactions={[{ type: 'element-active' }]}
                  />
                ) : (
                  <Empty description="No status data available" />
                )}
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Submission Timeline">
                {timelineData.length > 0 ? (
                  <Line
                    data={timelineData}
                    xField="date"
                    yField="count"
                    point={{ size: 5 }}
                    smooth={true}
                    label={{
                      formatter: (v) => `${v.count}`,
                      style: { fill: '#aaa' }
                    }}
                  />
                ) : (
                  <Empty description="No timeline data available" />
                )}
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
