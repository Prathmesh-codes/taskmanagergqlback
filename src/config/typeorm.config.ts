// configuration for DB connectivity

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeORMConfiguration: TypeOrmModuleOptions = {
  username: 'root',
  password: 'root',
  port: 3306,
  host: 'localhost',
  type: 'mysql',
  database: 'tmang',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],

  // true: all the properties in the entity classes will be synchronized with database
  synchronize: false,
};
