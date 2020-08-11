//// REFERENCES
// Premise 1
var p1Q = $("#premise-1-quantity");
var p1c1 = $("#premise-1-category-1");
var p1c2 = $("#premise-1-category-2");

// Premise 2
var p2Q = $("#premise-2-quantity");
var p2c1 = $("#premise-2-category-1");
var p2c2 = $("#premise-2-category-2");

// Premise 3
var p3Q = $("#premise-3-quantity");
var p3c1 = $("#premise-3-category-1");
var p3c2 = $("#premise-3-category-2");

// Button
var submitBtn = $("#submit-button");

// Correct/Incorrect Font-Awesome Icon
var resultIcon = $("#result-icon");
// class="fas fa-times-circle" FOR INCORRECT

// boolean check for non-sequitur
var isNonSequitur = false;

// Functionality
submitBtn.on("click", checkValidity)

function checkValidity() {
    isNonSequitur = false;
    checkNonSequitur()
    if (isNonSequitur == true) {
        console.log("This argument is a non-sequitur, try again.");
        resultIcon.removeClass("fa-check-circle").addClass("fa-times-circle");
        return
    }

    // Currently can't figure out how to code the categorical logic
    // Reference Page: https://en.wikipedia.org/wiki/Syllogism#Examples

    switch (p1Q) {
        case "All":
            break;
        case "Some":
            break;
        case "No":
            break;
    }
    switch (p2Q) {
        case "All":
            break;
        case "Some":
            break;
        case "No":
            break;
    }
    switch (p3Q) {
        case "All":
            break;
        case "Some":
            break;
        case "No":
            break;
    }
}

function checkNonSequitur() {
    // Checks to make sure there are exactly two copies of each category
    var p1 = [p1c1.val(), p1c2.val()];
    var p2 = [p2c1.val(), p2c2.val()];
    var p3 = [p3c1.val(), p3c2.val()];
    if ((p1[0] == p1[1])||(p2[0] == p2[1])||(p3[0] == p3[1])) {
        isNonSequitur = true;
        return
    }
    checkExactlyTwo(p1, p2.concat(p3))
    checkExactlyTwo(p2, p1.concat(p3))
    checkExactlyTwo(p3, p1.concat(p2))
}

function checkExactlyTwo(arrChecking, arrRef) {
    arrChecking.forEach(element => {
        var count = 0;
        for (var i = 0; i < 4; i++) {
            if (arrRef[i] == element) {
                count++;
            }
            else {
            }
        }
        if (count != 1) {
            isNonSequitur = true;
            return
        }
    });
}