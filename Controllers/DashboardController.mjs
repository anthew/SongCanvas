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

var addProject = document.getElementById("projectSubmit");
addProject.addEventListener("click", requestAddProject);

var projectArray = [];

function requestAddProject() {
    let projectName = document.getElementById("insertProjectName").value;
    let audioFile = document.getElementById("audioInput").value;

    let projectTable = document.getElementById("editorProjects");

    let template = `
            <tr colspan="4">
                <td id="editShape " style="border: 1px solid black;">
                    <button style="background-color: white; border: none;">${projectName}</button>
                </td>
                <td id="addedShapeVisible" style="border: 1px solid black;">
                    <button style="background-color: white; border: none;"><img style="width: 26px;
                    height: 26px;" src='/LoginMedia/EyeShow.png' ></button>
                </td>
                <td id="deleteShape" style="border: 1px solid black;">
                    <button style="background-color: white; border: none;"><img src='/EditorMedia/TrashCan.png' style="width: 26px;
                    height: 26px; "></button>
                </td>
                <td >
                    <input type="checkbox" style="margin: auto; width: 100%; height: 100%;">
                </td>
            </tr>
        `;
    
    projectTable.innerHTML += template;
}