import { Request, Response, Router } from 'express';
import Controller from '../../interfaces/controller.interface';

import { AwsKmsService } from './kms.service';

class KmsController implements Controller {
  public path = '/kms';
  public router = Router();
  private client = new AwsKmsService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/keylist`, this.getKeyList);
    this.router.get(`${this.path}/decrypt`, this.decrypt);

  }

  private getKeyList = (request, response) => {
    this.client.getKeys().subscribe(res => {
      return response.json(res);
    });
  }

  private decrypt = (request, response) => {
    this.client.decrypt().subscribe(res => {
      return response.json(res);
    });
  }
}

export default KmsController;