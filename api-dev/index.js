const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const customers = [
    { title: "田中", id: 1 },
    { title: "西道", id: 2 },
    { title: "横道", id: 3 },
    { title: "安藤", id: 4 },
    { title: "小道", id: 5 },
];

app.get('/api/customers', (req, res) => {
    res.send(customers);
});

app.post('/api/customers', (req, res) => {
    const customer = {
        title: req.body.title,
        id: customers.length + 1,
    };
    customers.push(customer);
    res.send(customer);
});

app.put('/api/customers/:id' , (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    customer.title = req.body.title;
    res.send(customer);
});

app.delete('/api/customers/:id' , (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));

    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    res.send(customer);
});
