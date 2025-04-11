const express = require('express');
const mqtt = require('mqtt');
const mysql = require('mysql2');
const AWS = require('aws-sdk');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL 연결
const db = mysql.createConnection({
  host: 'your-db-host',
  user: 'your-db-user',
  password: 'your-db-password',
  database: 'iot_data'
});

// AWS S3 설정
AWS.config.update({ region: 'ap-northeast-2' });
const s3 = new AWS.S3();

// MQTT 클라이언트
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com'); // 예시 broker

mqttClient.on('connect', () => {
  mqttClient.subscribe('iot/raspberry/data');
});

mqttClient.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  const { sensor, value, timestamp } = data;

  db.query('INSERT INTO sensor_data (sensor, value, timestamp) VALUES (?, ?, ?)',
    [sensor, value, timestamp]);

  // S3로 저장
  const s3params = {
    Bucket: 'your-s3-bucket-name',
    Key: `data/${sensor}_${Date.now()}.json`,
    Body: JSON.stringify(data),
    ContentType: 'application/json'
  };
  s3.upload(s3params, (err, result) => {
    if (err) console.error('S3 Error:', err);
  });
});

// REST API 예시
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 50', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
