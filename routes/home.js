const { Router } = require("express");
const { activateHome } = require("../controllers/home/activateHomeByIdController");
const { deactivateHome } = require("../controllers/home/deactivateHomeByIdController");
const { deleteHome } = require("../controllers/home/deleteHomeByIdController");
const { getAllDeletedHomes } = require("../controllers/home/getAllDeletedHomesByUserIdController");
const { getAllHomesByUser } = require("../controllers/home/getAllHomesByUserIdController");
const { allLivingAndActiveHomes } = require("../controllers/home/getAllLivingAndActiveHomesController");
const { getAllLivingHomesByUser } = require("../controllers/home/getAllLivingHomesByUserIdController");
const { getHome } = require("../controllers/home/getHomeByIdController");
const { insertHome } = require("../controllers/home/insertHomeController");
const { recoverHome } = require("../controllers/home/recoverHomeById");
const { updateHome } = require("../controllers/home/updateHomeByIdController");
const { validateJWT } = require("../middlewares/validate-jwt");



const router = Router();

//Obtener los homes por id del usuario
router.get('/homes', validateJWT, getAllHomesByUser);
//Obtener todos los homes vivos por id del usuario
router.get('/livingHomes', validateJWT, getAllLivingHomesByUser);
//Obtener todos los homes eliminados por id del usuario
router.get('/recoverHomes', validateJWT, getAllDeletedHomes);
//Obtener el home por su id
router.get('/homes/:id', validateJWT, getHome);
//Obtener todos los homes vivos y activos
router.get('/allLivingActivehomes', validateJWT, allLivingAndActiveHomes);
//Insertar un nuevo home
router.post('/homes', validateJWT, insertHome);
//Actualizar home
router.put('/homes/:id', validateJWT, updateHome);
//Actviar home
router.put('/activateHome/:id', validateJWT, activateHome);
//Desactivar home
router.put('/deactivateHome/:id', validateJWT, deactivateHome);
//Eliminar home
router.delete('/homes/:id', validateJWT, deleteHome);
//Recuperar home
router.put('/recoverHomes/:id', validateJWT, recoverHome);

module.exports = router;