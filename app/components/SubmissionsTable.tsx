'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Table, Card, DatePicker, Select, Button, Row, Col, Statistic, Space } from 'antd';
import type { TableProps } from 'antd';
import { FilterOptions, SortOptions, listSupervisionData, getSubmissionStats } from '../lib/server/database';
import { kenyaCounties, kenyaSubcounties, kenyaChus } from './utils/commonData';
import { BarChartOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;

interface SubmissionData {
  $id: string;
  status: string;
  formData: string; // JSON string
  $createdAt: string;
  $updatedAt: string;
}

interface ParsedFormData {
  locationDetails: {
    county: string;
    subCounty: string;
    chu: string;
  };
}

export default function SubmissionsTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SubmissionData[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [stats, setStats] = useState<any>(null);
  const [filters, setFilters] = useState<FilterOptions>({});


  // Sort configuration
  const sort = {
    field: '$createdAt',
    direction: 'desc' as const
  };

  const fetchData = async () => {
    if (!mounted.current) return;
    
    try {
      setLoading(true);
      const [response, statistics] = await Promise.all([
        listSupervisionData(filters, sort, currentPage, pageSize),
        getSubmissionStats()
      ]);
      
      if (!mounted.current) return;

      if (response && Array.isArray(response.documents)) {
        setData(response.documents);
        setTotal(response.total);
      } else {
        setData([]);
        setTotal(0);
      }
      
      setStats(statistics);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  };

  // Use ref to track component mount state
  const mounted = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Fetch data when filters or pagination changes
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, filters]);

  // Refresh data every 60 seconds if not loading
  useEffect(() => {
    if (!mounted.current) return;

    const interval = setInterval(() => {
      if (!loading) {
        fetchData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    fetchData();
  }, [filters, currentPage, pageSize]);

  const handleViewDetails = (record: SubmissionData) => {
    const formData = JSON.parse(record.formData);
    console.log('Form details:', formData);
    // TODO: Implement view details modal or navigation
  };



  const columns: TableProps<SubmissionData>['columns'] = [
    {
      title: 'Submission ID',
      dataIndex: '$id',
      key: '$id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'County',
      key: 'county',
      render: (_, record) => {
        try {
          const formData = JSON.parse(record.formData);
          return formData.locationDetails?.county || '-';
        } catch (e) {
          console.error('Error parsing county:', e);
          return '-';
        }
      },
    },
    {
      title: 'Sub-County',
      key: 'subCounty',
      render: (_, record) => {
        try {
          const formData = JSON.parse(record.formData);
          return formData.locationDetails?.subCounty || '-';
        } catch (e) {
          console.error('Error parsing subCounty:', e);
          return '-';
        }
      },
    },
    {
      title: 'CHU',
      key: 'chu',
      render: (_, record) => {
        try {
          const formData = JSON.parse(record.formData);
          return formData.locationDetails?.chu || '-';
        } catch (e) {
          console.error('Error parsing CHU:', e);
          return '-';
        }
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const displayStatus = status || 'N/A';
        return (
          <span style={{ 
            color: displayStatus === 'completed' ? '#52c41a' : '#1890ff',
            fontWeight: 500
          }}>
            {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
          </span>
        );
      }
    },
    {
      title: 'Created At',
      dataIndex: '$createdAt',
      key: 'createdAt',
      render: (date) => {
        try {
          return date ? new Date(date).toLocaleString() : 'N/A';
        } catch (e) {
          console.error('Error formatting date:', e);
          return 'Invalid Date';
        }
      },
    },
    {
      title: 'Last Updated',
      dataIndex: '$updatedAt',
      key: 'updatedAt',
      render: (date) => {
        try {
          return date ? new Date(date).toLocaleString() : 'N/A';
        } catch (e) {
          console.error('Error formatting date:', e);
          return 'Invalid Date';
        }
      },
    },
    {
      title: 'Supervisor',
      key: 'supervisor',
      render: (_, record) => {
        try {
          const formData = JSON.parse(record.formData);
          return formData.supervisionTeam?.supervisorName || '-';
        } catch (e) {
          return '-';
        }
      }
    },
    {
      title: 'Supervisor',
      key: 'supervisor',
      render: (_, record) => {
        try {
          const formData = JSON.parse(record.formData);
          return formData.supervisionTeam?.supervisorName || 'N/A';
        } catch (e) {
          console.error('Error parsing supervisor:', e);
          return 'N/A';
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {record.$id ? (
            <>
              <Button 
                type="primary" 
                size="small" 
                onClick={() => {
                  const formData = JSON.parse(record.formData);
                  alert(`Supervisor: ${formData.supervisionTeam?.supervisorName || 'N/A'}\nCounty: ${formData.locationDetails?.county || 'N/A'}\nStatus: ${record.status || 'N/A'}`);
                }}
              >
                View Details
              </Button>
              <Button 
                size="small" 
                onClick={() => window.location.href = '/visualizations'}
              >
                Analytics
              </Button>
            </>
          ) : (
            <span>No actions available</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Quick Stats and Actions */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col>
          <Button 
            type="primary"
            icon={<BarChartOutlined />}
            onClick={() => window.location.href = '/visualizations'}
          >
            View Analytics Dashboard
          </Button>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col>
            <Select
              placeholder="Select County"
              style={{ width: 200 }}
              onChange={(value) => setFilters({ ...filters, county: value, subCounty: undefined, chu: undefined })}
              allowClear
            >
              {kenyaCounties.map(county => (
                <Select.Option key={county.value} value={county.value}>{county.label}</Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Select Sub-County"
              style={{ width: 200 }}
              onChange={(value) => setFilters({ ...filters, subCounty: value, chu: undefined })}
              allowClear
            >
              {filters.county && kenyaSubcounties[filters.county] ? 
                kenyaSubcounties[filters.county].map(subCounty => (
                  <Select.Option key={subCounty.value} value={subCounty.value}>{subCounty.label}</Select.Option>
                )) : 
                <Select.Option disabled>Select a county first</Select.Option>
              }
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Select CHU"
              style={{ width: 200 }}
              onChange={(value) => setFilters({ ...filters, chu: value })}
              allowClear
            >
              {filters.county && filters.subCounty && kenyaChus[filters.county]?.[filters.subCounty] ? 
                kenyaChus[filters.county][filters.subCounty].map(chu => (
                  <Select.Option key={chu.value} value={chu.value}>{chu.label}</Select.Option>
                )) : 
                <Select.Option disabled>Select a county and sub-county first</Select.Option>
              }
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Select Status"
              style={{ width: 200 }}
              onChange={(value) => setFilters({ ...filters, status: value })}
              allowClear
            >
              <Select.Option value="draft">Draft</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Col>
          <Col>
            <RangePicker
              onChange={(dates) => {
                if (dates) {
                  setFilters({
                    ...filters,
                    startDate: dates[0]?.toISOString(),
                    endDate: dates[1]?.toISOString()
                  });
                } else {
                  const { startDate, endDate, ...rest } = filters;
                  setFilters(rest);
                }
              }}
            />
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<BarChartOutlined />}
              onClick={() => {
                if (data.length === 0) {
                  alert('Please submit some supervision forms first before viewing analytics.');
                  return;
                }
                window.location.href = '/visualizations';
              }}
              disabled={data.length === 0}
            >
              View Analytics {data.length === 0 ? '(No Data)' : ''}
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Data Table */}
      <div style={{ minHeight: '100vh' }}>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} items`,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }
          }}
          rowKey="$id"
          locale={{
            emptyText: loading ? 'Loading...' : 'No supervision data found. Please submit some forms.'
          }}
        />
        

      </div>
      
      {/* Debug Information */}

    </div>
  );
}
