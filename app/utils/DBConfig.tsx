const DBConfig = {
  name: 'chw-supervision',
  version: 1,
  objectStoresMeta: [
    {
      store: 'entries',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'values', keypath: 'values', options: { unique: false } },
      ],
    },
  ],
};

export default DBConfig;
