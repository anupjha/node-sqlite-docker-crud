export default class {
  id!: number;
  name!: string;
  currency: string;
  department: string;
  sub_department: string;
  salary: number;
  on_contract: number;
  constructor(name: string, currency: string, department: string, sub_department: string, salary: number, on_contract: number) {
    this.name = name;
    this.currency = currency;
    this.department = department;
    this.sub_department = sub_department;
    this.salary = salary;
    this.on_contract = on_contract;
  }
}
