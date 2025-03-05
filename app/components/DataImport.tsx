import React, { useState, useEffect } from 'react';
import { Upload, Button, message, Select, Card, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { convertCsvToJson } from '../utils/csvToJson';
// Mock upload function - will be replaced with PostgreSQL
const mockUpload = async (data: any, callbacks: any) => {
  console.log('Mock upload:', data);
  if (callbacks?.onProgress) {
    callbacks.onProgress(1, 1);
  }
  return true;
};

const { Option } = Select;

interface HierarchyData {
  county: string;
  sub_county: string;
  ward: string;
  chu: string;
  facility_name: string;
}

export const DataImport: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [importStatus, setImportStatus] = useState('');
  const [selectedCounty, setSelectedCounty] = useState<string>('');
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [hierarchyData, setHierarchyData] = useState<HierarchyData[]>([]);
  const [importProgress, setImportProgress] = useState(0);

  useEffect(() => {
    loadHierarchyData();
  }, []);

  const loadHierarchyData = async () => {
    try {
      const response = await fetch('/api/hierarchy');
      if (!response.ok) {
        throw new Error('Failed to fetch hierarchy data');
      }
      const data = await response.json();
      setHierarchyData(data);
    } catch (error) {
      console.error('Error loading hierarchy data:', error);
      message.error('Failed to load hierarchy data');
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      setImportProgress(0);

      // Step 1: Read and validate CSV
      setImportStatus('Reading CSV file...');
      const jsonData = await convertCsvToJson(file);
      setImportProgress(10);

      if (!jsonData || jsonData.length === 0) {
        throw new Error('No data found in CSV file');
      }

      console.log('Converted CSV data:', {
        count: jsonData.length,
        sampleRow: jsonData[0]
      });

      // Validate required fields
      const requiredFields = ['county', 'sub_county', 'ward', 'chu'];
      const missingFields = requiredFields.filter(field => !jsonData[0][field]);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      setImportProgress(20);
      setImportStatus(`Preparing to import ${jsonData.length} records...`);

      // Step 2: Import to PostgreSQL with timeout
      setImportStatus('Importing data to PostgreSQL...');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 300000); // 5 minute timeout

      try {
        const response = await fetch('/api/import', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
          signal: controller.signal
        });

        clearTimeout(timeout);

        console.log('Got API response:', response.status);
        const result = await response.json();
        console.log('API response body:', result);

        if (!response.ok) {
          throw new Error(result.details || result.error || 'Failed to import data');
        }

        setImportProgress(70);

        // Step 3: Backup to Appwrite
        setImportStatus('Creating backup in Appwrite...');
        await uploadJsonToAppwrite(jsonData, {
          onProgress: (current, total) => {
            const progress = Math.round(70 + (current / total) * 20);
            setImportProgress(progress);
            setImportStatus(`Uploading to Appwrite: ${current}/${total} records...`);
          }
        });
        setImportProgress(90);

        // Step 4: Refresh data
        setImportStatus('Refreshing data...');
        await loadHierarchyData();

        setImportProgress(100);
        setImportStatus('Import completed successfully!');
        message.success(`Successfully imported ${jsonData.length} records!`);
      } catch (innerError) {
        clearTimeout(timeout);
        throw innerError;
      }

    } catch (error) {
      console.error('Import error:', error);
      let errorMessage = 'Failed to import data';
      
      // Handle API response errors
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });

        // Handle specific error types
        if (error.name === 'AbortError') {
          errorMessage = 'Import timed out after 5 minutes. Try importing a smaller file or contact support.';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = 'Could not connect to server. Please check if the server is running.';
        } else if (error.message.includes('ECONNREFUSED')) {
          errorMessage = 'Database connection failed. Please check if PostgreSQL is running.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Database operation timed out. Try again with a smaller file.';
        }
      }
      
      message.error(errorMessage);
      // Show a more detailed error message in the console
      console.error('Detailed error:', {
        error,
        message: errorMessage,
        type: error instanceof Error ? error.constructor.name : typeof error
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique values for dropdowns
  const counties = [...new Set(hierarchyData.map(item => item.county))];
  const subCounties = [...new Set(hierarchyData
    .filter(item => !selectedCounty || item.county === selectedCounty)
    .map(item => item.sub_county)
  )];
  const wards = [...new Set(hierarchyData
    .filter(item => 
      (!selectedCounty || item.county === selectedCounty) &&
      (!selectedSubCounty || item.sub_county === selectedSubCounty)
    )
    .map(item => item.ward)
  )];
  const chus = hierarchyData
    .filter(item => 
      (!selectedCounty || item.county === selectedCounty) &&
      (!selectedSubCounty || item.sub_county === selectedSubCounty) &&
      (!selectedWard || item.ward === selectedWard)
    )
    .map(item => ({
      name: item.chu,
      facility: item.facility_name
    }));

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card title="Import Data" size="small">
          {importStatus && (
            <div style={{ marginBottom: 16 }}>
              <div>Status: {importStatus}</div>
              <div style={{ 
                width: '100%', 
                height: '20px', 
                backgroundColor: '#f0f0f0',
                borderRadius: '10px',
                overflow: 'hidden',
                marginTop: '8px'
              }}>
                <div style={{
                  width: `${importProgress}%`,
                  height: '100%',
                  backgroundColor: '#1890ff',
                  transition: 'width 0.3s ease-in-out'
                }} />
              </div>
            </div>
          )}
          <Upload
            accept=".csv"
            beforeUpload={(file) => {
              handleFileUpload(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              Upload CSV File
            </Button>
          </Upload>
        </Card>

        <Card title="Hierarchy Navigation" size="small">
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Select
              style={{ width: '100%' }}
              placeholder="Select County"
              value={selectedCounty}
              onChange={setSelectedCounty}
              allowClear
            >
              {counties.map((county) => (
                <Option key={county} value={county}>{county}</Option>
              ))}
            </Select>

            <Select
              style={{ width: '100%' }}
              placeholder="Select Sub-County"
              value={selectedSubCounty}
              onChange={setSelectedSubCounty}
              allowClear
              disabled={!selectedCounty}
            >
              {subCounties.map((subCounty) => (
                <Option key={subCounty} value={subCounty}>{subCounty}</Option>
              ))}
            </Select>

            <Select
              style={{ width: '100%' }}
              placeholder="Select Ward"
              value={selectedWard}
              onChange={setSelectedWard}
              allowClear
              disabled={!selectedSubCounty}
            >
              {wards.map((ward) => (
                <Option key={ward} value={ward}>{ward}</Option>
              ))}
            </Select>
          </Space>
        </Card>

        {chus.length > 0 && (
          <Card title="Community Health Units" size="small">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {chus.map((chu, index) => (
                <li key={index} style={{ marginBottom: '8px', padding: '8px', border: '1px solid #f0f0f0' }}>
                  <strong>{chu.name}</strong>
                  {chu.facility && (
                    <div style={{ color: '#666', fontSize: '0.9em' }}>
                      Facility: {chu.facility}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </Space>
    </div>
  );
};
