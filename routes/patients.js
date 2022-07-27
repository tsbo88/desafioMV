const express = require ('express');
const router = express.Router();
const Patient = require('../models/Patient');

/**
 * @api {get} /patients/ Request Patient list
 * @apiName GetPatient
 * @apiGroup patients
 *
 * @apiSuccess {[Patient]} Patients list.
 * 
 */
router.get('/', async (request, response) => {
    const patient = await Patient.find();

    return response.status(200).send(patient);
});

/**
 * @api {get} /patients/:id Request a Patient information
 * @apiName GetSpecificPatient
 * @apiGroup patients
 
 * @apiParam {Number} id Patient unique ID.
 *
 * @apiSuccess {Patient} Patient data.
 * 
 */
router.get('/:id', async (request, response) => {
    const patient = await Patient.findById(request.params.id);

    return response.status(200).send(patient);
});


/**
 * @api {post} /patients/ Create Patient Information
 * @apiName PostPatient
 * @apiGroup patients
 * 
 * @apiParam {String} name Patient name.
 * @apiParam {Number} healthInsuranceCardId Patient health Insurance CardId.
 * @apiParam {String} address Patient address. 
 * 
 * @apiSuccess {Patient} New Patient.
 */
router.post('/', async (request, response) => {
    
    const patient = await Patient.create({
        name: request.body.name, 
        healthInsuranceCardId: request.body.healthInsuranceCardId,
        address: request.body.address,
        createdAt: new Date().toLocaleDateString("en-US")
    });

    return response.status(201).send(patient);

});

/**
 * @api {put} /patients/:id Update Patient information
 * @apiName PutPatient
 * @apiGroup patients
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Patient} Patient updated information.
 */
router.put('/:id', async (request, response) => {
    const patient = await Patient.findById(request.params.id);
    
    patient.name = request.body.name
    patient.healthInsuranceCardId = request.body.healthInsuranceCardId
    patient.address = request.body.address
    const newPatient = await patient.save();

    return response.status(200).send(newPatient);
});

/**
 * @api {delete} /patients/:id Delete Patient
 * @apiName DeletePatient
 * @apiGroup patients
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {void}
 */
router.delete('/:id', async (request, response) => {
    await Patient.findByIdAndDelete(request.params.id);

    return response.status(200).send();
});

module.exports = router;