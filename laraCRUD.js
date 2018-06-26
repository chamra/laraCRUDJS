class CRUD {

  constructor() {
    this.form = "formData";
    this.modal = "#formModal";
    this.submitButton = "#btnSubmit";
    this.datatables = "";
    this.url = "";
    this.refreshPage = false;
    this.update = false;
    this.id = 0;
  }

  getFromToJquery(){
    return "#"+this.form;
  }

  RESTapi(method , url) {
    let formData = new FormData(document.getElementById(this.form));

    if (!window.axios) {
      throw "Axios is not linked";
    }

    if (this.update) {
      formData.append('_method', 'PATCH');
    }

    return axios[method](url, formData)
  }

  errors(response) {

    if (window.$.notify !== undefined) {
      if (response.response.status !== 422) {
        $.notify({message: "Internal Error"},{type: 'danger',z_index:2000});
        return;
      }

      for (let msg in response.response.data) {
        $.notify({message: response.response.data[msg]},{type: 'danger',z_index:2000});
      }
    }
  }

  success(response) {
    if (this.refreshPage) {
      location.reload()
    }

    if (window.$.notify !== undefined) {
      $.notify({message: response.data.msg},{type: 'success',z_index:2000});
    }

    $(this.modal).modal('hide')
    this.clearFrom();
    this.datatables.draw()


  }

  appendAdditionaData(data,formData){

    if (typeof data !== 'object') {
      throw  'Addition has to be an object';
    }

    data.forEach(field => {

      if (field.type === "file") {
        formData.append(field.fieldName , field.value , field.fileName );
      }else {
        formData.append(field.fieldName , field.value);
      }

    });
  }

  initDataTables(tableElement,options){
    if (typeof options !== "object") {
      throw 'Options has to be an object';
    }

    if (!window.jQuery) {
      throw 'Jquery is not linked';
    }

    this.datatables = $(tableElement).DataTable(options);
  }

  initCRUDFunctions(options) {
    if (typeof options !== "object") {
      throw 'Options has to be an object';
    }

    if (!window.jQuery) {
      throw 'Jquery is not linked';
    }

    for (let option in options) {
      if (this.hasOwnProperty(option)) {
          this[option] = options[option];
      }
    }
  }

  onclickAdd(){
    this.clearFrom();
    this.update = false;
    $(this.modal).modal('show');
  }

  onClickEdit(id, btn){
    this.clearFrom()
    $(btn).prop("disabled", true);
    this.update = true;
    this.id = id;

    this.getData(this.id).then(res => {
      $(btn).prop("disabled", false);
      this.loadDataToFrom(res.data)
      $(this.modal).modal('show')
    }).catch(error => {
      $(btn).prop("disabled", false);
      this.errors(error);
    });
  }

  onClickDelete(id , btn){
    $(btn).prop("disabled", true);
    this.submitDelete(id).then(res => {
      this.success(res);
      $(btn).prop("disabled", false);
      this.datatables.draw()
    }).catch(error => {
      $(btn).prop("disabled", false);
      this.errors(error);
    });
  }

  clearFrom() {
    let form = this.getFromToJquery();
    $(this.submitButton).prop("disabled", false);
    $(form).find('input[type="text"]').val('');
    $(form).find('input[type="email"]').val('');
    $(form).find('input[type="number"]').val('');
    $(form).find('input[type="password"]').val('');
    $(form).find('textarea').val('');
    $(form).find('input[name="_token"]').val(token);
    $(form).find('input[type="checkbox"]').attr({'checked': false});
    $(form).find('input[type="radio"]').attr({'checked': false});
  }

  loadDataToFrom(data){
    let form = this.getFromToJquery();
    for (var input in data) {
      $('input[name="'+input+'"][type="text"]').val(data[input]);
      $('input[name="'+input+'"][type="number"]').val(data[input]);
      $('input[name="'+input+'"][type="email"]').val(data[input]);
      $('input[name="'+input+'"][type="url"]').val(data[input]);
      $('input[name="'+input+'"][type="radio"][value="'+data[input]+'"]').attr({'checked' : 'checked'})
      $('textarea[name="'+input+'"]').val(data[input]);
    }
  }

  submitData(){
    $(this.submitButton).prop("disabled", true);

    let promise;

    if (this.update) {
      promise = this.submitEdit(this.id)
    }else {
      promise = this.submitCreate()
    }

    promise.then(res => {
      $(this.submitButton).prop("disabled", false);
      this.success(res);
    }).catch(error => {
      $(this.submitButton).prop("disabled", false);
      this.errors(error);
    });
  }

  submitCreate(){
    return this.RESTapi("post", this.url);
  }

  submitEdit(id){
    return this.RESTapi("post", this.url+"/"+id);
  }

  getData(id){
    return this.RESTapi("get", this.url+"/"+id);
  }

  submitDelete(id){
    return this.RESTapi("delete", this.url+"/"+id);
  }
}
