/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import repo from '../repositories/item.repository';
import { Request, Response } from 'express';
import Item from '../models/item';
import { getMeanModeMedian } from '../helpers';

export default class {
  static async getAllItems(req: Request, res: Response, next: Function) {
    const items = await repo.getAllItems();

    return res.send({ items });
  }

  static async getItemById(req: Request, res: Response, next: Function) {
    const item = await repo.getItemById(req.params.id);

    if (!item) {
      return res.status(404).send(item);
    }
    return res.send({ item });
  }

  static async createItem(req: Request, res: Response, next: Function) {
    if (!req.body.name || !req.body.salary) {
      const err: Error = new Error('Name and salary are required.');

      return next(err);
    }
    const newItem = new Item(req.body.name, req.body.salary, req.body.department, req.body.sub_department, req.body.currency, req.body.on_contract);

    const success = await repo.createItem(newItem);

    return res.send({ success, item: newItem });
  }

  // static async updateItem(req: Request, res: Response, next: Function) {
  //   if (!req.body.id || !req.body.name || !req.body.price) {
  //     const err: Error = new Error('Item id, name and price are required.');

  //     return next(err);
  //   }
  //   const success = await repo.updateItem(req.body);

  //   return res.send({ success, item: req.body });
  // }

  static async deleteItem(req: Request, res: Response, next: Function) {
    if (!req.params.id) {
      const err: Error = new Error('Item id is required.');

      return next(err);
    }
    const deleted = await repo.deleteItem(Number(req.params.itemId));

    return res.send({ success: deleted });
  }

  static async getStatisticsAll(req: Request, res: Response, next: Function) {
    const { on_contract: onCntract } = req.query;

    const rawData = await repo.getStatisticsData();

    if (onCntract && onCntract == 'true') {
      const salaries = rawData.filter((obj) => obj.on_contract === 1).map((obj) => obj.salary);
    } else {
      const salaries = rawData.map((obj) => obj.salary);

      return res.send(getMeanModeMedian(salaries));
    }
  }

  static async getStatisticsDepartment(req: Request, res: Response, next: Function) {
    const rawData = await repo.getStatisticsData();
    const departmentStats = rawData.reduce(function (r, a) {
      r[a.department] = r[a.department] || [];
      r[a.department].push(a.salary);
      return r;
    }, Object.create(null));

    const stats = {};

    for (const key in departmentStats) {
      stats[key] = getMeanModeMedian(departmentStats[key]);
    }
    return res.send(stats);
  }

  static async getStatisticsSubdepartment(req: Request, res: Response, next: Function) {
    const rawData = await repo.getStatisticsData();
    const departmentData = rawData.reduce(function (r, a) {
      r[a.department] = r[a.department] || [];
      r[a.department].push(a);
      return r;
    }, Object.create(null));
    const stats = {};

    for (const key in departmentData) {
      const subDepartmentData = departmentData[key].reduce(function (r, a) {
        r[a.sub_department] = r[a.sub_department] || [];
        r[a.sub_department].push(a.salary);
        return r;
      }, Object.create(null));

      for (const key of Object.keys(subDepartmentData)) {
        subDepartmentData[key] = getMeanModeMedian(subDepartmentData[key]);
      }
      stats[key] = subDepartmentData;
    }
    return res.send(stats);
  }
}
