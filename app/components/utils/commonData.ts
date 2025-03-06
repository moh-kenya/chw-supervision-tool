// Kenya Counties, Sub-counties, and CHUs Data
export const kenyaChus: { [key: string]: { [key: string]: Array<{ value: string; label: string }> } } = {
  'Nairobi': {
    'Westlands': [
      { value: 'CHU-001', label: 'Westlands CHU 1' },
      { value: 'CHU-002', label: 'Parklands CHU' },
      { value: 'CHU-003', label: 'Spring Valley CHU' }
    ],
    'Dagoretti North': [
      { value: 'CHU-004', label: 'Kilimani CHU' },
      { value: 'CHU-005', label: 'Kawangware CHU' }
    ],
    'Kibra': [
      { value: 'CHU-006', label: 'Kibera CHU 1' },
      { value: 'CHU-007', label: 'Kibera CHU 2' },
      { value: 'CHU-008', label: 'Sarangombe CHU' }
    ]
  },
  'Mombasa': {
    'Mvita': [
      { value: 'CHU-009', label: 'Old Town CHU' },
      { value: 'CHU-010', label: 'Majengo CHU' }
    ],
    'Nyali': [
      { value: 'CHU-011', label: 'Kongowea CHU' },
      { value: 'CHU-012', label: 'Nyali CHU' }
    ]
  },
  'Kisumu': {
    'Kisumu Central': [
      { value: 'CHU-013', label: 'Kondele CHU' },
      { value: 'CHU-014', label: 'Migosi CHU' }
    ],
    'Kisumu East': [
      { value: 'CHU-015', label: 'Nyalenda CHU' },
      { value: 'CHU-016', label: 'Manyatta CHU' }
    ]
  },
  'Nakuru': {
    'Nakuru Town East': [
      { value: 'CHU-017', label: 'Bondeni CHU' },
      { value: 'CHU-018', label: 'Lake View CHU' }
    ],
    'Nakuru Town West': [
      { value: 'CHU-019', label: 'Kaptembwo CHU' },
      { value: 'CHU-020', label: 'Rhonda CHU' }
    ]
  }
};

// Kenya Counties and Sub-counties Data
export const kenyaSubcounties: { [key: string]: Array<{ value: string; label: string }> } = {
  'Nairobi': [
    { value: 'Westlands', label: 'Westlands' },
    { value: 'Dagoretti North', label: 'Dagoretti North' },
    { value: 'Dagoretti South', label: 'Dagoretti South' },
    { value: 'Langata', label: 'Langata' },
    { value: 'Kibra', label: 'Kibra' },
    { value: 'Roysambu', label: 'Roysambu' },
    { value: 'Kasarani', label: 'Kasarani' },
    { value: 'Ruaraka', label: 'Ruaraka' },
    { value: 'Embakasi South', label: 'Embakasi South' },
    { value: 'Embakasi North', label: 'Embakasi North' },
    { value: 'Embakasi Central', label: 'Embakasi Central' },
    { value: 'Embakasi East', label: 'Embakasi East' },
    { value: 'Embakasi West', label: 'Embakasi West' },
    { value: 'Makadara', label: 'Makadara' },
    { value: 'Kamukunji', label: 'Kamukunji' },
    { value: 'Starehe', label: 'Starehe' },
    { value: 'Mathare', label: 'Mathare' }
  ],
  'Mombasa': [
    { value: 'Mvita', label: 'Mvita' },
    { value: 'Nyali', label: 'Nyali' },
    { value: 'Kisauni', label: 'Kisauni' },
    { value: 'Jomvu', label: 'Jomvu' },
    { value: 'Changamwe', label: 'Changamwe' },
    { value: 'Likoni', label: 'Likoni' }
  ],
  'Kisumu': [
    { value: 'Kisumu East', label: 'Kisumu East' },
    { value: 'Kisumu West', label: 'Kisumu West' },
    { value: 'Kisumu Central', label: 'Kisumu Central' },
    { value: 'Seme', label: 'Seme' },
    { value: 'Nyando', label: 'Nyando' },
    { value: 'Muhoroni', label: 'Muhoroni' },
    { value: 'Nyakach', label: 'Nyakach' }
  ],
  'Nakuru': [
    { value: 'Nakuru Town East', label: 'Nakuru Town East' },
    { value: 'Nakuru Town West', label: 'Nakuru Town West' },
    { value: 'Naivasha', label: 'Naivasha' },
    { value: 'Gilgil', label: 'Gilgil' },
    { value: 'Kuresoi South', label: 'Kuresoi South' },
    { value: 'Kuresoi North', label: 'Kuresoi North' },
    { value: 'Molo', label: 'Molo' },
    { value: 'Rongai', label: 'Rongai' },
    { value: 'Subukia', label: 'Subukia' },
    { value: 'Bahati', label: 'Bahati' }
  ]
};

// Kenya Counties Data
export const kenyaCounties = [
  { value: 'Nairobi', label: 'Nairobi' },
  { value: 'Mombasa', label: 'Mombasa' },
  { value: 'Kisumu', label: 'Kisumu' },
  { value: 'Nakuru', label: 'Nakuru' },
  { value: 'Kiambu', label: 'Kiambu' },
  { value: 'Machakos', label: 'Machakos' },
  { value: 'Kajiado', label: 'Kajiado' },
  { value: 'Uasin Gishu', label: 'Uasin Gishu' },
  { value: 'Kakamega', label: 'Kakamega' },
  { value: 'Kilifi', label: 'Kilifi' },
  { value: 'Bungoma', label: 'Bungoma' },
  { value: 'Murang\'a', label: 'Murang\'a' },
  { value: 'Nyeri', label: 'Nyeri' },
  { value: 'Meru', label: 'Meru' },
  { value: 'Kitui', label: 'Kitui' },
  { value: 'Makueni', label: 'Makueni' },
  { value: 'Garissa', label: 'Garissa' },
  { value: 'Mandera', label: 'Mandera' },
  { value: 'Wajir', label: 'Wajir' },
  { value: 'Turkana', label: 'Turkana' },
  { value: 'West Pokot', label: 'West Pokot' },
  { value: 'Samburu', label: 'Samburu' },
  { value: 'Trans Nzoia', label: 'Trans Nzoia' },
  { value: 'Baringo', label: 'Baringo' },
  { value: 'Elgeyo Marakwet', label: 'Elgeyo Marakwet' },
  { value: 'Nandi', label: 'Nandi' },
  { value: 'Laikipia', label: 'Laikipia' },
  { value: 'Nakuru', label: 'Nakuru' },
  { value: 'Narok', label: 'Narok' },
  { value: 'Kajiado', label: 'Kajiado' },
  { value: 'Kericho', label: 'Kericho' },
  { value: 'Bomet', label: 'Bomet' },
  { value: 'Kakamega', label: 'Kakamega' },
  { value: 'Vihiga', label: 'Vihiga' },
  { value: 'Bungoma', label: 'Bungoma' },
  { value: 'Busia', label: 'Busia' },
  { value: 'Siaya', label: 'Siaya' },
  { value: 'Kisumu', label: 'Kisumu' },
  { value: 'Homa Bay', label: 'Homa Bay' },
  { value: 'Migori', label: 'Migori' },
  { value: 'Kisii', label: 'Kisii' },
  { value: 'Nyamira', label: 'Nyamira' },
  { value: 'Nairobi', label: 'Nairobi' },
  { value: 'Mombasa', label: 'Mombasa' },
  { value: 'Kwale', label: 'Kwale' },
  { value: 'Kilifi', label: 'Kilifi' },
  { value: 'Tana River', label: 'Tana River' },
  { value: 'Lamu', label: 'Lamu' },
  { value: 'Taita Taveta', label: 'Taita Taveta' },
  { value: 'Marsabit', label: 'Marsabit' },
  { value: 'Isiolo', label: 'Isiolo' },
  { value: 'Meru', label: 'Meru' },
  { value: 'Tharaka Nithi', label: 'Tharaka Nithi' },
  { value: 'Embu', label: 'Embu' },
  { value: 'Kitui', label: 'Kitui' },
  { value: 'Machakos', label: 'Machakos' },
  { value: 'Makueni', label: 'Makueni' },
  { value: 'Nyandarua', label: 'Nyandarua' },
  { value: 'Nyeri', label: 'Nyeri' },
  { value: 'Kirinyaga', label: 'Kirinyaga' },
  { value: 'Murang\'a', label: 'Murang\'a' },
  { value: 'Kiambu', label: 'Kiambu' }
];
