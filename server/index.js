const PORT = 3000;
const express = require('express');
const socketIO = require('socket.io');
const https = require('https');

// Inicializa o servidor Express
const server = express().listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

// Inicializa o Socket.IO
const io = socketIO(server, {
  cors: {
    origin: "http://192.168.1.70:8081",  // Substitua pelo IP do seu dispositivo de frontend
    methods: ["GET", "POST"]
  }
});

// Opções para a solicitação HTTPS
const options = {
    hostname: 'pro-api.coinmarketcap.com',
    port: 443,
    path: '/v2/cryptocurrency/quotes/latest?slug=bitcoin,ethereum,ethervista',
    method: 'GET',
    headers: {
        'X-CMC_PRO_API_KEY': '64392d45-163a-413e-bbc8-a11e8300dec7',
        'Accept': 'application/json'
    }
};

// Evento de conexão do Socket.IO
io.on('connection', (socket) => {
    console.log('New client connected');

    // Envia uma mensagem inicial ao cliente
    socket.emit('crypto', 'Welcome to the Crypto Price Tracker!');

    // Lida com a desconexão do cliente
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Lida com a solicitação de atualização dos dados
    socket.on('requestCryptoData', () => {
        fetchCryptoData(); // Chama a função para atualizar os dados
    });
});

// Função para buscar e emitir os dados de preços de criptomoedas
const fetchCryptoData = () => {
    https.request(options, (res) => {
        let data = '';

        // Recebe os dados em partes
        res.on('data', (chunk) => (data += chunk));

        // Processa os dados ao final
        res.on('end', () => {
            try {
                const response = JSON.parse(data);

                // Extrai os símbolos e preços
                const cryptoData = Object.values(response.data).map((coin) => ({
                    id: coin.id,
                    name: coin.symbol,
                    price: coin.quote.USD.price
                }));
                // Emite os dados para todos os clientes conectados
                io.emit('crypto', cryptoData);
            } catch (error) {
                console.error('Erro ao processar dados da API:', error);
            }
        });
    }).on('error', (error) => {
        console.error('Erro na solicitação HTTPS:', error);
    }).end();
};

// Atualiza os preços a cada 5 segundos
setInterval(fetchCryptoData, 1000);
