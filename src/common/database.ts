import mariadb from 'mariadb';
import appConfig from './config';

export default mariadb.createPool(appConfig.db);
