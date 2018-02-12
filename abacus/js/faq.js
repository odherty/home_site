/**
 * 
 * 
 * 
 */

//These two variables create a buffer to know what the last click ID was. For the purpose of the currently 'clicked' background
var oldID;
var olderID;
var tempID;

$(document).ready(function() {
        CKEDITOR.disableAutoInline = true;
        $("#content div ul").on('click', 'a.submitBtn', function () {
            submitAnswer(this.parentNode.id);
        });
        $("#content div ul").on('click', 'a.editBtn', function () {
            editAnswer(this.parentNode.id);
        });
        $("#content div ul").on('click', 'a.resetBtn', function () {
            resetAnswer(this.parentNode.id);
        });
});


/**
 * 
 * 
 * @param {any} answerID :: this is the ID of the button clicked
 * 
 * This function makes the selected answer editable, and then changes editBtn that was clicked to a submitBtn
 * 
 * 
 */
function editAnswer(answerID) {
    //Constructs what answer to edit
    var faqField = answerID.replace(/[0-9]/g, '') + "answer" + answerID.slice(-1, answerID.length);
    var currentEdit = document.getElementById(faqField);
    
    temp = 'edit' + answerID.replace(/[0-9]/g, '') + answerID.slice(-1, answerID.length);
    var editBtn = document.getElementById('edit' + answerID.replace(/[0-9]/g, '') + answerID.slice(-1, answerID.length));

    CKEDITOR.inline(currentEdit);

    //Toggles the answer's contentEditable attribute
    if (currentEdit.contentEditable == "inherit") {
        currentEdit.contentEditable = "false";
    }
    if (currentEdit.contentEditable == "false") {
        currentEdit.contentEditable = "true";
    } else {
        currentEdit.contentEditable = "false";
    }

    //When blur, CK editor is destoryed and the contentEditable attribute is false
    $(currentEdit).blur(function() {
        currentEdit.contentEditable = "false";
        for (editor in CKEDITOR.instances) {
            CKEDITOR.instances[editor].destroy(true);
        }
        
        //Change to submit button
        editBtn.id = "submit";
        editBtn.title = "Submit";
        editBtn.classList = "fa fa-2x fa-check-square submitBtn answer";
    });
    editBtn.classList = "fa fa-2x fa-pencil submitBtn answer";
    editBtn.title = "Click on text to edit!";
}


/**
 * 
 * 
 * @param {any} answerID :: this is the ID of the button clicked
 * 
 * This button submits the edited text through a php script through AJAX
 * The php script 'submitEdit.php' replaces the answer's text in the faq.JSON file
 * 
 */
function submitAnswer(answerID) {
    var submitBtn = document.getElementById('submit');
    var currentEdit = temp.substring(4);
    var currentID = currentEdit.replace(/[a-z]/g, '')
    currentEdit = currentEdit.replace(/[0-9]/g, '');
    var currentCategory = currentEdit;
    currentEdit = currentEdit + 'answer' + temp.replace(/[a-z]/g, '');
    var currentAnswer = document.getElementById(currentEdit);
    // ajax stuff
    $.ajax({
        type: "POST",
        url: "includes/submitEdit.php",
        data: {
            reset: false,
            editedText: currentAnswer.innerHTML,
            currentID: currentID,
            currentCategory: currentCategory
        },
        dataType: "text",
        success: function (data) {
            console.log(data);
        }
    });
    
    submitBtn.id = temp;
    submitBtn.classList = "fa fa-2x fa-pencil-square editBtn answer";
    submitBtn.title = "Edit";
}

function resetAnswer(answerID) {
    var currentCategory = answerID.replace(/[0-9]/g, '');
    var currentID = answerID.replace(/[a-z]/g, '');
    var currentAnswer = document.getElementById(answerID.replace(/[0-9]/g, '') + "answer" + answerID.replace(/[a-z]/g, ''));

    $.ajax({
        type: "POST",
        url: "includes/submitEdit.php",
        data: {
            reset: true,
            editedText: null,
            currentID: currentID,
            currentCategory: currentCategory
        },
        success: function (data) {
            // console.log(data);
            currentAnswer.innerHTML = data;
        }
    });
}

/**
 * 
 * 
 * @param {any} faqID :: This parameter is the ID of the button/category that is clicked.
 */
function fillContent(faqID) {
    document.getElementById("getting_started").style.display = "none";
    document.getElementById("dor").style.display = "none";
    document.getElementById("notification").style.display = "none";
    document.getElementById("school_wide").style.display = "none";
    var content = faqID.slice(0, faqID.length - 3);

    // Buffer Vars
    olderID = oldID;
    oldID = faqID;

    // Button Color Changes
    var button = document.getElementById(faqID);
    button.style.backgroundColor = "#ffe0aa";
    var olderButton = document.getElementById(olderID);
    if (olderButton != null) {
        olderButton.style.backgroundColor = "white";
    }


    // Display Content
    var content = faqID.slice(0, faqID.length - 3)
    var content = document.getElementById(content);

    switch (content.style.display) {
        case "block":
            content.style.display = "none";
            break;
        case "none":
            content.style.display = "block";
            break;
    }

}