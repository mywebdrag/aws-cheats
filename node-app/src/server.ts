import App from './app';
import KmsController from './security/kms/kms.controller';

const app = new App(
  [
    new KmsController()
  ],
);

app.listen();