//// REFERENCES
// Premise 1
var p1Q = $("#premise-1-quantity");
var p1G = $("#premise-1-grammar");
var p1c1 = $("#premise-1-category-1");
var p1c2 = $("#premise-1-category-2");

// Premise 2
var p2Q = $("#premise-2-quantity");
var p2G = $("#premise-2-grammar");
var p2c1 = $("#premise-2-category-1");
var p2c2 = $("#premise-2-category-2");

// Premise 3
var p3Q = $("#premise-3-quantity");
var p3G = $("#premise-3-grammar");
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
        dispResult(false);
        return
    }

    var Categories = {
    };
    Categories[p1c2.val()] = {};
    Categories['otherCat'] = {};
    
    switch ($(p1Q.children("option:selected")).val()) {
        case "all":
            Categories[p1c2.val()][p1c1.val()] = {};
            break;
        case "some":
            Categories[p1c2.val()][p1c1.val()] = {};
            Categories['otherCat'][p1c1.val()] = {};
            break;
        case "no":
            Categories['otherCat'][p1c1.val()] = {};
            break;
    }
    switch ($(p2Q.children("option:selected")).val()) {
        case "all":
            break;
        case "some":

            break;
        case "no":
            break;
    }
    switch ($(p3Q.children("option:selected")).val()) {
        case "all":
            if (Categories[p3c2.val()].hasOwnProperty(p3c1.val())) {
                dispResult(true);
            }
            else {
                var flag = false;
                Object.keys(Categories[p3c2.val()]).forEach(field => {
                    if (Categories[p3c2.val()][field].hasOwnProperty(p3c1.val())) {
                        flag = true;
                    }
                })
                dispResult(flag);
                break;
            }
            break;
        case "some":
            break;
        case "no":
            break;
    }
}

// Checks to make sure there are exactly two copies of each category
function checkNonSequitur() {
    var p1 = [p1c1.val(), p1c2.val()];
    var p2 = [p2c1.val(), p2c2.val()];
    var p3 = [p3c1.val(), p3c2.val()];
    if ((p1[0] == p1[1])||(p2[0] == p2[1])||(p3[0] == p3[1])) {
        isNonSequitur = true;
        return
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

    checkExactlyTwo(p1, p2.concat(p3))
    checkExactlyTwo(p2, p1.concat(p3))
    checkExactlyTwo(p3, p1.concat(p2))
}

// Console logs whether or not the argument is valid and displays an icon
function dispResult (correct) {
    if (correct) {
        console.log("This argument is valid");
        resultIcon.removeClass().addClass("fas fa-check-circle");
    }
    else {
        console.log("This argument is not valid");
        resultIcon.removeClass().addClass("fas fa-times-circle");
    }
}

// Why doesn't the code below this work???

p1Q.on("change", detectIfNot(1))
p2Q.on("change", detectIfNot(2))
p3Q.on("change", detectIfNot(3))

function detectIfNot(premise) {
    console.log("s")
    switch (premise) {
        case 1:
            if (p1Q.val() == "some") {
                var newOptionS = $("<option>");
                var newOptionP = $("<option>");
                newOptionS.text("is not");
                newOptionP.text("are not");
                p1G.append(newOptionP, newOptionS);
            }
            break;
        case 2:
            if (p2Q.val() == "some") {
                var newOptionS = $("<option>");
                var newOptionP = $("<option>");
                newOptionS.text("is not");
                newOptionP.text("are not");
                p2G.append(newOptionP, newOptionS);
            }
            break;
        case 3:
            if (p3Q.val() == "some") {
                var newOptionS = $("<option>");
                var newOptionP = $("<option>");
                newOptionS.text("is not");
                newOptionP.text("are not");
                p3G.append(newOptionP, newOptionS);
            }
            break;
    }
}