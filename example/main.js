/**
 * Please note that RESTapi fuction would not 
 * like this you need implement this in Laravel
 */

const crud = new CRUD()

const datatable = crud.initDataTables('.table', {});

//you send the following to this function
// {
//     modal: "#formModal",
//     submitButton : "#btnSubmit",
//     url :"",
//     refreshPage: false,
// }
//with zero configuration
crud.initCRUDFunctions({})
