const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    healthInsuranceCardId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Patients', PatientSchema);
