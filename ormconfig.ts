
module.exports = {
  "type": process.env.DB_TYPE || 'mysql',
  "host": process.env.DB_HOST || 'localhost',
  "port": process.env.DB_PORT || 3306,
  "username": process.env.DB_USERNAME || 'root',
  "password": process.env.DB_PASSWORD || 'root',
  "database": process.env.DB_NAME || 'beauty_db',
  "entities": [
    "src/**/*Entity.ts"
  ],
  "synchronize": true,
  "seeds": [
    "test/seeders/JobTimesSeeder.ts",
    "test/seeders/CategorySeeder.ts",
    "test/seeders/CustomersSeeder.ts",
    "test/seeders/SalonsSeeder.ts",
    "test/seeders/MastersSeeder.ts",
    "test/seeders/ServiceSeeder.ts",
    "test/seeders/ClientsSeeder.ts",
  ],
  "factories": [
    "test/factories/JobTimesFactory.ts",
    "test/factories/CategoryFactory.ts",
    "test/factories/CustomersFactory.ts",
    "test/factories/SalonsFactory.ts",
    "test/factories/MastersFactory.ts",
    "test/factories/ServiceFactory.ts",
    "test/factories/ClientsFactory.ts",
  ]
}
