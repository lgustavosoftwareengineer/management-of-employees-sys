const creatingTableEmployees = `CREATE TABLE employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text UNIQUE,
  last_name text UNIQUE,
  birth_date text,
  role_id text,
  CONSTRAINT name UNIQUE (UNIQUE)
  )`;

export default creatingTableEmployees;
