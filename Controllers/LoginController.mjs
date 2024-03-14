console.log("Hello there");

$(document).ready(function(){
    

    //For login html
    const $form = $('#login-form');

    $form.on('submit', loginHandler);

    function loginHandler(e)
    {
        e.preventDefault()
        
        alert("Entered loginHandler function");

        $.ajax({
            url: '/loginAuth',
            method: 'POST',
            dataType: 'json',
            data:  $form.serialize(), 
        }).done(response => {
            if(response.msg=="true")
                window.location.href = "/DashboardViews/dashboard.html"//"./DashboardViews/dashboard.html";
            else
                alert(response.alert);
        });
    }
//===================================================================================
    // for create account
    const $createForm = $('#signup-form');

    $createForm.on('submit', createHandler);
    
    function createHandler(e) {
        e.preventDefault()
        //alert("Entered createHandler function");

        $.ajax({
            url: '/createAcc',
            method: 'POST',
            dataType: 'json',
            data:  $createForm.serialize(), 
        }).done(response => {
            alert("account function called");
            if(response.msg=="true")
                window.location.href = "./login.html";
            else
                alert(response.alert);
        });
    }
});