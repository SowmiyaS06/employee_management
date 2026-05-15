const Employee = require('../models/Employee');


const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(employees);
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const { name,email,departments,salary,joining_date } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!salary) {
      return res.status(400).json({ message: 'Salary is required' });
    }

    const employee = await Employee.create({
      name,
      email,
      departments,
      salary,
      joining_date,
      user: req.user.id
    });

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employees not found' });
    }

    if (employee.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    employee.name = req.body.name ?? employee.name;
    employee.email = req.body.email ?? employee.email;
    employee.departments = req.body.departments ?? employee.departments;
    employee.salary = req.body.salary ?? employee.salary;
    employee.joining_date = req.body.joining_date ?? employee.joining_date;

    const updatedEmployee = await employee.save();

    return res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employees not found' });
    }

    if (employee.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    await employee.deleteOne();
    return res.json({ message: 'Employee details deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
