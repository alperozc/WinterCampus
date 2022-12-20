import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: '192.168.1.25',
    port: 49153,
    username: 'campusapi',
    password: 'campus',
    database: 'wintercampus',
    entities: ['dist/src/**/*.entity{.js,.ts}'],
    migrations: ['dist/db/migrations/*{.js,.ts}'],
    synchronize: true,
}

const dataSourceOptionssss: DataSourceOptions = {
    type: 'mongodb',
    host: '127.0.0.1',
    port: 27017,
    database: 'wintercampus',
    entities: ['dist/src/**/*.entity{.js,.ts}'],
    migrations: ['dist/db/migrations/*{.js,.ts}'],
    synchronize: true,
    useUnifiedTopology: true,
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource