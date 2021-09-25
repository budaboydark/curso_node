module.exports = {
  apps: [
    {
      name: "scontabil",
      script: "app.js",
      cwd: "/home/rodrigo.silva/tarefas/scontabil",
      watch: ["app","config"],
      watch_delay: 1000,
      env: {
      },
      env_development: {
        NODE_ENV: "development",
        APP_ENV:"local",
        DBHOST:"localhost",
        DBPASS:"rodrigo",
        DBUSER:"rodrigo",
        DBDATABASE:"banco_teste",
        DBPORT:3306,
        HOST: "localhost",
        PORT_PROXY: "3020",
      },
      env_production: {
        NODE_ENV: "production",
        APP_ENV:"prod",
        DBHOST:"172.18.0.2",
        DBPASS:"rodrigo",
        DBUSER:"rodrigo",
        DBDATABASE:"scontabil",
        DBPORT:3306,
        HOST: "localhost",
        PORT_PROXY: "3020",
      }
    },
  ]
};
