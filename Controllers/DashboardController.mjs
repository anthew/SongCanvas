
$(document).ready(function(){
    $("#editorModal").click(populateEditorTable);

    function populateEditorTable(e) {
        e.preventDefault()
        alert("EditorTable Called");

        $.ajax({
            url: '/projectRetrival',
            method: 'POST',
        }).done(response => {
            alert("Request Successful");

            //Popluate the table in modal given the id
        })
    }
});