import { connection } from "../database/database.js";

//                              FAZER A QUERY DO GET

export async function getCustomers(req, res) {
  try {
    const costumers = await connection.query(`
            SELECT *
            FROM customers
        `);
    res.send(costumers.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  const customer = req.customer;
  try {
    res.send(customer);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.body;
  try {
    await connection.query(
      `
        INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)  
      
        `,
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function putCustomer(req, res) {
  const id = req.id;
  const { name, phone, cpf, birthday } = res.locals.body;

  try {
    await connection.query(
      `
        UPDATE customers 
        SET name= ($1), phone= ($2), cpf= ($3), birthday=($4) 
        WHERE id = ($5)   
        `,
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
