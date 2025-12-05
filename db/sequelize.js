import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'db_contacts_wppi_user',
    password: '7jTP2Xahf8Lmb5VmWSn9k46vbXKrmfL9',
    host: 'dpg-d4oqgjh5pdvs73ar16sg-a.frankfurt-postgres.render.com',
    database: 'db_contacts_wppi',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

export default sequelize;
