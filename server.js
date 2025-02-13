const express = require('express');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const width = 800;
const height = 600;
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

app.post('/generate-chart', async (req, res) => {
  const { labels, data, type } = req.body;

  const configuration = {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: 'My Dataset',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  res.set('Content-Type', 'image/png');
  res.send(image);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
