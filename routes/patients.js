const express = require ('express');
const router = express.Router();
const Patient = require('../models/Patient');

//Rotas para recuperar todos os pacientes
router.get('/', async (request, response) => {
    const patient = await Patient.find();
    response.status(200).send(patient);
});

//Rota para recuperar um paciente em específico
router.get('/:id', async (request, response) => {
    const patient = await Patient.findById(request.params.id);
    response.status(200).send(patient);
});

//Rota para criar os dados do paciente
router.post('/', async (request, response) => {
    
    const patient = await Patient.create({
        name: request.body.name, 
        healthInsuranceCardId: request.body.healthInsuranceCardId,
        address: request.body.address,
        createdAt: new Date().toLocaleDateString("en-US")
    }); 
    return response.status(201).send(patient);

});

//Rota para atualizar os dados do paciente
router.put('/:id', async (request, response) => {
    const patient = await Patient.findById(request.params.id);
    
    patient.name = request.body.name
    patient.healthInsuranceCardId = request.body.healthInsuranceCardId
    patient.address = request.body.address
    const newPatient = await patient.save();
    response.status(200).send(newPatient);

});

//Rota para apagar os dados do paciente
router.delete('/:id', async (request, response) => {
    await Patient.findByIdAndDelete(request.params.id);
    response.status(200).send();

});

module.exports = router;

