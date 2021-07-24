import CustomerStorage from './customerStorage';

const db = new CustomerStorage();
db.bootStrap({ mode: 'local', timeout: 60 * 60 * 12 });

export default db;
