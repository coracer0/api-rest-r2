import { Request, Response } from "express";
import {dao} from '../dao/indexDAO';

class IndexController {
  constructor() {}

  public  async list(req: Request, res: Response): Promise<void> {
    const result = await dao.test();
    res.json(result);
  }
  public  async update(req: Request, res: Response): Promise<void> {
    const result = await dao.test();
    res.json(result);
  }
  public  async delete(req: Request, res: Response): Promise<void> {
    const result = await dao.test();
    res.json(result);
  }
  public  async insert(req: Request, res: Response): Promise<void> {
    const result = await dao.test();
    res.json(result);
  }


}
export const indexController = new IndexController();
