const creatingTableRoles = `CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text UNIQUE,
  description text,
  CONSTRAINT name UNIQUE (UNIQUE)
  )`;

export default creatingTableRoles;
