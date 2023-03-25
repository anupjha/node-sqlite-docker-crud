import dao from './dao';
import Item from '../models/item';

export default class {
  static async getAllItems(): Promise<Item[]> {
    const items = await dao.all('SELECT * FROM items', []);

    return <Item[]>items;
  }

  static async getItemById(id: string): Promise<Item> {
    const item = await dao.get('SELECT * FROM items WHERE id = ?', [id]);

    return <Item>item;
  }

  static async createItem(item: Item): Promise<boolean> {
    const stmt = `INSERT INTO items (name, salary, currency,department,sub_department,on_contract) VALUES (?,?,?,?,?,?);`;

    try {
      await dao.run(stmt, [item.name, item.salary, item.currency, item.department, item.sub_department, item.on_contract]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  //   static async updateItem(item: Item): Promise<boolean> {
  //     const stmt = `UPDATE items SET name = ?, price= ? WHERE id = ?;`;

  //     try {
  //       await dao.run(stmt, [item.name, item.price, item.id]);
  //       return true;
  //     } catch (err) {
  //       console.error(err);
  //       return false;
  //     }
  //   }

  static async deleteItem(itemId: number) {
    const stmt = `DELETE FROM items WHERE id = ?;`;

    try {
      await dao.run(stmt, [itemId]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async getStatisticsData() {
    const items = await dao.all('SELECT * FROM items', []);

    return <Item[]>items;
  }
}
