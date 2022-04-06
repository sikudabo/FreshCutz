const mongoose = require('mongoose');
const testerModal = require('./testerModal');

mongoose.connect(process.env.localDbUri);

testerModal.findOne({ firstName: 'Simeon' }, (err, result) => {
    if (err) {
        console.log('Error:', err.message);
        mongoose.connection.close();
        process.exit(1);
    }

    console.log('The result is:', result);
    mongoose.connection.close();
    process.exit(1);
});