import { createContext, useEffect, useState } from 'react';
import { DatabaseHttp } from '@/http';
import { DatabaseContextType } from './Types';

export const databaseContext = createContext<DatabaseContextType>({
  database: 'default',
  databases: ['default'],
  setDatabase: () => {},
  setDatabaseList: () => {},
});

const { Provider } = databaseContext;
export const DatabaseProvider = (props: { children: React.ReactNode }) => {
  const [database, setDatabase] = useState<string>('default');
  const [databases, setDatabases] = useState<string[]>(['default']);

  const fetchDatabases = async () => {
    const res = await DatabaseHttp.getDatabases();
    setDatabases(res.db_names);
  };

  useEffect(() => {
    fetchDatabases();
  }, []);

  return (
    <Provider
      value={{
        database,
        databases,
        setDatabase,
        setDatabaseList: setDatabases,
      }}
    >
      {props.children}
    </Provider>
  );
};