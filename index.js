const express = require("express");
const cors = require('cors')
const PORT = process.env.PORT || "5555";
const app = express();
const logger  = require('./logger')

app.use(cors());
app.use(express.json())

app.all("/", (req, res) => {
    
    res.json({ method: req.method, message: "Hello World", ...req.body });
});

app.get('/404', (req, res) => {
    res.sendStatus(404);
    logger.customerLogger.log('error', 'Erro a entrar na pagina');
})


app.post('/submit', (req, res) => {
    const inputValue = req.body.inputValue;
    const trimmedValue = inputValue.trim();
  
  if (trimmedValue === '' || trimmedValue.length < 3){
    // Exibir uma mensagem de erro para o usuário
    logger.customerLogger.log('error', 'APLICACAO2 -Erro');
    res.status(400).json({ message: 'O valor do input deve ter pelo menos 3 caracteres!' });
  } else {
    // Log a mensagem de sucesso
    logger.customerLogger.log('info', 'APLICACAO2');
    res.status(200).json({ message: 'Colocado com sucesso!' });
  }
});

app.listen(parseInt(PORT, 10), () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});