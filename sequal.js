const Sequelize = requrie('sequelize')
const sequelize = new Sequelize("database", "username", "passsword",{
    host: 'localhost',
    dialect: mysql
});

const User = sequelize.define('user',{
    
})