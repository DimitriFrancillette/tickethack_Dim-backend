const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://dimf:9mes9mjdegG8SdFI@cluster0.idjdkrw.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));