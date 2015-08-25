function getEmptyFormFieldsByNameAttrs(form){
    var fields = $( form ).serializeArray(),
      invalids = [];
    // 0 => utf code, 1 => name, 2 => email
    // slightly smarter email validation
    _.forEach(fields, function(field){
      if ( field.value === '' ){
        invalids.push(field.name);
      }
    });
    return invalids;
  };


module.exports = getEmptyFormFields;