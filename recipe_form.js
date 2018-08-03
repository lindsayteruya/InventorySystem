
$(document).ready(function(){

    $("button[id=add_ingredient]").click(function(){
        var $table = $('#table');
        var $row = $('#table_row');
        var $rowClone = $row.clone(); // Clone table row
        $rowClone.find('input').val(""); // Remove values of inputs in cloned row
        $table.append($rowClone); // Append row to table 
        $rowClone.append('<button type="button" name="delete_button" onClick="delete_row(this)"> - </button>');
    });
    
    function delete_row(del_button){
                $(del_button).closest('tr').remove();
});
