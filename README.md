# LaraCURDJS

JavaScript Helper library for laravel CRUD functions

## Installation

1. Download zip file and unzip it
2. place the `laraCRUD.js` file inside you acceset folder.
3. create new object from `CRUD` class which is in the `laraCRUD.js`.
4. Call the methods `initCRUDFunctions()` to initiate curd function or `initDataTables()` to initiate datatables.

## Usage

* create a object from the `CRUD` class
    <br> example - `crud =  new CRUD()`

* provide the object with data to initiate crud function to the method.
    <br> example -  
    `const crudInit = {  
        url : url,
        modal : '#formModal',
        refreshPage : false,
        form: 'formData', //should pass the id with out #
        submitButton: '#btnSubmit',
    }`
* call the `initCRUDFunctions(crudInit)` by passing the `crudInit`

* LaraCURD prodives methods like `crud.onclickAdd()` , `crud.onClickEdit(id, btn)` , `crud.onClickDelete(id, btn)` which can be called in buttons' `onclick`.

**the form should be in a modal**

* datatables can be initiate by calling `initDataTables()` method and passing the option object.

## Extenral Libraries used

<br>[axios](https://github.com/axios/axios)
<br>[jquery](https://jquery.com/)
<br>[Notify.js](https://notifyjs.jpillora.com/)
<br>[Datatables](https://www.datatables.net/)

## [DEV](https://dev.to/cha_m_ra/laracrudjs-33n4) Post
