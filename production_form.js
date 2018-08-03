var mysql_url = "http://192.168.2.26:8080";

function createCORSRequest(method, url){
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, false);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
};

function populate_product_dropdown(){
  var xhr = createCORSRequest('GET', mysql_url + '/getproducts');
  xhr.send();
  var product_dropdown = document.getElementById("select_product_dropdown");
  var json_data = JSON.parse(xhr.response);
  for (var i=0; i<json_data.length; i++){
    var option_item = document.createElement("option");
    option_item.text = json_data[i]["product_name"];
    option_item.value = json_data[i]["product_name"];
    product_dropdown.add(option_item);
  }
}
function populate_recipe_table(product){
  var xhr = createCORSRequest('GET', mysql_url + '/getrecipe/' + product);
  xhr.send();
  var old_tbody = document.getElementById("recipe_table").childNodes[0];
  var new_tbody = document.createElement('tbody');
  var json_data = JSON.parse(xhr.response);
  document.getElementById('form_reset_button').style.visibility = 'visible';

  // Add ingredients to table
  for (var i=0; i<json_data.length; i++){
    var table_row = document.createElement("tr");
    var ingredient_td = document.createElement("td");
    var quantity_td = document.createElement("td");
    var unit_td = document.createElement("td");

    // Create nodes
    ingredient_text = document.createTextNode(json_data[i]["ingredient"]);
    quantity_box = document.createElement("input")
    quantity_box.setAttribute("type", "number");
    unit_text = document.createTextNode(json_data[i]["unit"]);

    // Appending nodes to table data (adding children)
    ingredient_td.appendChild(ingredient_text);
    quantity_td.appendChild(quantity_box);
    unit_td.appendChild(unit_text);

    // Appending table data to rows
    table_row.appendChild(ingredient_td);
    table_row.appendChild(quantity_td);
    table_row.appendChild(unit_td);

    // Appending rows to table
    new_tbody.appendChild(table_row);
  }
  old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
}




$(document).ready(function() {
  populate_product_dropdown();
  document.getElementById('form_reset_button').style.visibility = 'hidden';

  //Selects an item from the dropdown
  $("#select_product_dropdown").change(function() {
      populate_recipe_table(this.value);
  })

});
