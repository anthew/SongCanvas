$(document).ready(function(){

    
    $("#ProjectOpenButton").click(openExistingProject);

    function openExistingProject(e)
    {
        e.preventDefault()

        //Gets the projectID from the "value" attribute in the radio button
        var theProjID = document.querySelector('input[name=project_list]:checked').value;

        if(theProjID==null)
            return;

        $.ajax({
            url: '/openProject',
            method: 'POST',
            data: {
                project_ID: theProjID,
            },
        }).done(response=>{
            window.location.href = "/EditorViews/editor.html";
        });
        
    }

    $("#ProjectDeleteButton").click(deleteExistingProject);

    function deleteExistingProject(e)
    {
        e.preventDefault()

        //Gets the projectID from the "value" attribute in the radio button
        var theProjID = document.querySelector('input[name=project_list]:checked').value;

        if(theProjID==null)
            return;

        console.log(theProjID);

        $.ajax({
            url: '/deleteProject',
            method: 'POST',
            data: {
                project_ID: theProjID,
            },
        }).done(response=>{
            alert("Performed Delete");
        });
    }


    $("#editorModal").click(populateEditorTable);

    function populateEditorTable(e) {
        e.preventDefault()
        alert("EditorTable Called");

        $.ajax({
            url: '/dashboardProjectsRetrieval',
            method: 'POST',
        }).done(response => {
            var table = document.getElementById('editorProjects');
            var tableData = response.data;


            console.log("Table data: " + tableData);
            //Clear the table            
            for (let i = table.rows.length - 1; i > 0; i--) {
                table.deleteRow(i);
            }

            //Popluate the table in modal with the queried data
            for(let i=0; i<response.data.length; i++)
            {
                requestAddProject(tableData[i].ProjectName, tableData[i].CreatedAt, tableData[i].updated_at, tableData[i].Project_ID);
            }
        });
    }

    $("#projectSubmit").click(createProject);

    function createProject(e)
    {
        e.preventDefault();

        alert("EditorCreate function called");
        var formData = new FormData();

        formData.append('soundFile', document.getElementById("audioInput").files[0]);
        //console.log(document.getElementById("insertProjectName").value);
        formData.append('projectName', document.getElementById("insertProjectName").value);

        $.ajax({
            url: '/cloudStorageTest',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            encType: "multipart/form-data",
        }).done(response => {
            // if(repsonse.msg=="true")
            //     alert("Project Successfuly Created");
            // else
            //     alert("Duplicate Project Found");
            alert(response.file);
            console.log(response.file);
            alert("function worked");
        });

    }
});

//var addProject = document.getElementById("projectSubmit");
//addProject.addEventListener("click", requestAddProject);

var projectArray = [];

function requestAddProject(projectName, CreatedAt, updated_at, projectID){
    //let projectName = document.getElementById("insertProjectName").value;
    //let audioFile = document.getElementById("audioInput").value;

    let projectTable = document.getElementById("editorProjects");

    let template = `
            <tr colspan="4">
                <td id="editShape " style="border: 1px solid black;">
                    <button style="background-color: white; border: none;">${projectName}</button>
                </td>
                <td id="addedShapeVisible" style="border: 1px solid black;">
                    ${CreatedAt}
                </td>
                <td id="deleteShape" style="border: 1px solid black;">
                    ${updated_at}
                </td>
                <td>
                    <input type="radio" id="${projectID}" value= ${projectID} name="project_list" style="margin: auto; width: 100%; height: 100%;">
                </td>
            </tr>
        `;
    
    projectTable.innerHTML += template;
}