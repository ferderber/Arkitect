var config = {};
switch (process.env.NODE_ENV) {
  case 'dev':
    config = {
      db: 'mongodb://localhost/Arkitect',
      redis: process.env.REDIS_URL || '127.0.0.1',
      arkConfig: process.env.ARK_CONFIG || './README.md',
      arkAddress: process.env.ARK_ADDRESS,
      arkPassword: process.env.ARK_PASSWORD,
      arkPort: process.env.ARK_PORT,
      port: 3000
    };
    break;
  case 'prod':
    config = {
      db: process.env.MONGOLAB_URI,
      redis: process.env.REDIS_URL,
      arkAddress: process.env.ARK_ADDRESS,
      arkPassword: process.env.ARK_PASSWORD,
      arkPort: process.env.ARK_PORT,
      arkConfig: process.env.ARK_CONFIG || '/home/steam/games/ark/ShooterGame/Saved/Config/LinuxServer/GameUserSettings.ini',
      port: process.env.PORT
    };
    break;
  default:
    config = {
      db: 'mongodb://localhost/Arkitect',
      redis: process.env.REDIS_URL,
      arkAddress: process.env.ARK_ADDRESS,
      arkPassword: process.env.ARK_PASSWORD,
      arkPort: process.env.ARK_PORT,
      arkConfig: process.env.ARK_CONFIG || '/home/steam/games/ark/ShooterGame/Saved/Config/LinuxServer/GameUserSettings.ini',
      port: 3000
    };
    break;
}
console.log(config);
module.exports = config;
