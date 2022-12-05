import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
    type: 'mongodb',
    host: '127.0.0.1',
    port: 27017,
    database: 'wintercampus',
    entities: ['dist/src/**/*.entity{.js,.ts}'],
    synchronize: true,
    useUnifiedTopology: true,
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource