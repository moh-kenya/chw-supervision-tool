const parseCSVLine = (line: string): string[] => {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }

  values.push(currentValue.trim());
  return values;
};

export const convertCsvToJson = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/);
        let headerIndex = 0;

        // Find first non-empty line (headers)
        while (headerIndex < lines.length && !lines[headerIndex].trim()) {
          headerIndex++;
        }

        if (headerIndex >= lines.length) {
          throw new Error('CSV file is empty');
        }

        // Parse headers
        const headers = parseCSVLine(lines[headerIndex])
          .map(h => h.replace(/["]/g, '').trim().toLowerCase());

        // Define column name variations
        const columnVariations = {
          county: ['county', 'county_name', 'countyname', 'county name', 'facility_county'],
          sub_county: ['sub_county', 'sub county', 'subcounty', 'sub-county', 'subcounty_name', 'facility_subcounty'],
          ward: ['ward', 'ward_name', 'wardname', 'ward name', 'facility_ward'],
          chu: ['chu', 'chu_name', 'chuname', 'chu name', 'community health unit', 'name']
        };

        // Map columns
        const columnMapping: {[key: string]: string} = {};
        const missingColumns: string[] = [];

        for (const [key, variations] of Object.entries(columnVariations)) {
          const foundColumn = headers.find(h => variations.includes(h));
          if (foundColumn) {
            columnMapping[key] = foundColumn;
          } else {
            missingColumns.push(`${key} (tried: ${variations.join(', ')})`);
          }
        }

        if (missingColumns.length > 0) {
          throw new Error(
            'Missing required columns:\n' +
            missingColumns.map(col => `- ${col}`).join('\n') + '\n\n' +
            'Available columns: ' + headers.join(', ')
          );
        }

        // Process data rows
        const results: any[] = [];
        let skippedRows = 0;
        let validRows = 0;

        for (let i = headerIndex + 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const values = parseCSVLine(line);
          if (values.length !== headers.length) {
            console.warn(`Line ${i + 1}: Expected ${headers.length} columns, got ${values.length}`);
            skippedRows++;
            continue;
          }

          const mappedRow: any = {};
          let hasAllRequiredFields = true;

          for (const [key, mappedHeader] of Object.entries(columnMapping)) {
            const index = headers.indexOf(mappedHeader);
            const value = values[index].replace(/["]/g, '').trim();
            
            if (!value) {
              console.warn(`Line ${i + 1}: Missing ${key}`);
              hasAllRequiredFields = false;
              break;
            }
            mappedRow[key] = value;
          }

          if (!hasAllRequiredFields) {
            skippedRows++;
            continue;
          }

          validRows++;
          results.push(mappedRow);
        }

        if (validRows === 0) {
          throw new Error('No valid data rows found in CSV');
        }

        console.log('CSV Import Results:', {
          total: lines.length - (headerIndex + 1),
          valid: validRows,
          skipped: skippedRows,
          sample: results[0]
        });

        resolve(results);
      } catch (error) {
        console.error('CSV Processing Error:', error);
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
