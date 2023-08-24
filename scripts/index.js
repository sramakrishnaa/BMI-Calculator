$(document).ready(function () {

    var weightInput = $("#weight");
    var heightInput = $("#height");
    var heightInputfeet = $("#height-in-feet");
    var heightInputinch = $("#height-in-inch");
    var metricUnitButton = $("#metric-unit")
    var standardUnitbutton = $("#standard-unit");
    var calculateButton = $("#button");
    var resultValue = $("#result-value");
    var bmiCategory = $("#bmi-category");
    var bmiImage = $("#bmi-image");
    var isMetric = true;

    // Unit Update Function
    function updateUnits() {
        if (isMetric) {
            $(".weight-unit-text").text("kilograms");
            $("label[for='weight']").text("Enter Your Weight (kg's)");

            weightInput.val("");
            heightInput.val("");

            standardUnitbutton.removeClass("bg");
            metricUnitButton.addClass("bg");

            $("#standard-height").addClass("dis");
            $("#metric-height").removeClass("dis");

            resultValue.html("<strong>" + 0 + "</strong>");
            bmiCategory.html("<strong>" + "Unknown" + "</strong>");

            $("#bmi-sugg").html("");
        }
        else {
            $(".weight-unit-text").text("pounds");
            $("label[for='weight']").text("Enter Your Weight (lbs)");

            weightInput.val("");
            heightInputfeet.val("");
            heightInputinch.val("");

            standardUnitbutton.addClass("bg");
            metricUnitButton.removeClass("bg");

            $("#metric-height").addClass("dis");
            $("#standard-height").removeClass("dis");

            resultValue.html("<strong>" + 0 + "</strong>");
            bmiCategory.html("<strong>" + "Unknown" + "</strong>");

            $("#bmi-sugg").html("");
        }
    }

    // Unit click Button
    metricUnitButton.click(function () {
        isMetric = true;
        resultValue.css("color", "black");
        bmiCategory.css("color", "black");
        bmiImage.addClass("dis");
        updateUnits();
    });

    standardUnitbutton.click(function () {
        isMetric = false;
        resultValue.css("color", "black");
        bmiCategory.css("color", "black");
        bmiImage.addClass("dis");
        updateUnits();
    });


    // Calculate Function
    calculateButton.click(function () {

        var weightValue = parseFloat(weightInput.val());
        var heightValue;
        var heightValuefeet;
        var heightValueinch;
        var bmi;


        if (isMetric) {
            heightValue = parseFloat(heightInput.val());

            if (isNaN(weightInput.val()) || weightInput.val() == "") {
                weightInput.attr("data-bs-content", "Please enter a valid weight.");
                weightInput.popover("dispose").popover("update");
                weightInput.addClass("is-invalid");
                weightInput.popover("show");
            }
            else if (weightInput.val() <= 0) {
                weightInput.attr("data-bs-content", "Please enter a value greater than 0.");
                weightInput.popover("dispose").popover("update");
                weightInput.addClass("is-invalid");
                weightInput.popover("show");
            }

            else if (isNaN(heightInput.val()) || heightInput.val() == "") {
                heightInput.attr("data-bs-content", "Please enter a valid weight.");
                heightInput.popover("dispose").popover("update");
                heightInput.addClass("is-invalid");
                heightInput.popover("show");
            }
            else if (heightInput.val() <= 0) {
                heightInput.attr("data-bs-content", "Please enter a value greater than 0.");
                heightInput.popover("dispose").popover("update");
                heightInput.addClass("is-invalid");
                heightInput.popover("show");
            }
            else {
                heightValue /= 100;
                bmi = weightValue / (heightValue ** 2);
                resultValue.html("<strong>" + bmi.toFixed(2) + " kg/m<sup>2</sup>" + "</strong>");
                bmiCategory.html("<strong>" + getbmiCategory(bmi.toFixed(2)) + "</strong>");

                weightInput.removeClass("is-invalid");
                weightInput.popover("hide");
                heightInput.removeClass("is-invalid");
                heightInput.popover("hide");
            }
        }

        else {
            heightValuefeet = parseInt(heightInputfeet.val());
            heightValueinch = parseFloat(heightInputinch.val());

            if (isNaN(weightInput.val()) || weightInput.val() == "") {
                weightInput.attr("data-bs-content", "Please enter a valid weight.");
                weightInput.popover("dispose").popover("update");
                weightInput.addClass("is-invalid");
                weightInput.popover("show");
            }
            else if (weightInput.val() <= 0) {
                weightInput.attr("data-bs-content", "Please enter a value greater than 0.");
                weightInput.popover("dispose").popover("update");
                weightInput.addClass("is-invalid");
                weightInput.popover("show");
            }

            // height in feet
            else if (isNaN(heightInputfeet.val()) || heightInputfeet.val() == "") {
                heightInputfeet.attr("data-bs-content", "Please enter a valid height in feet.");
                heightInputfeet.popover("dispose").popover("update");
                heightInputfeet.addClass("is-invalid");
                heightInputfeet.popover("show");
            }
            else if (isNaN(heightInputinch.val()) || heightInputinch.val() == "") {
                heightInputinch.addClass("is-invalid");
                heightInputinch.popover("show");
            }
            else if (heightInputfeet.val() != Math.floor(heightInputfeet.val())) {
                heightInputfeet.attr("data-bs-content", "Please enter a whole number for feet.");
                heightInputfeet.popover("dispose").popover("update");
                heightInputfeet.addClass("is-invalid");
                heightInputfeet.popover("show");
            }
            else if (heightInputfeet.val() <= 0) {
                heightInputfeet.attr("data-bs-content", "Please enter a value greater than 0 feet.");
                heightInputfeet.popover("dispose").popover("update");
                heightInputfeet.addClass("is-invalid");
                heightInputfeet.popover("show");
            }
            else if (heightInputfeet.val() >= 12) {
                heightInputfeet.attr("data-bs-content", "Please enter a value less than 12 feet.");
                heightInputfeet.popover("dispose").popover("update");
                heightInputfeet.addClass("is-invalid");
                heightInputfeet.popover("show");
            }

            // height in inches
            else if (heightInputinch.val() >= 12) {
                heightInputinch.attr("data-bs-content", "Please enter a value less than 12 inches.");
                heightInputinch.popover("dispose").popover("update");
                heightInputinch.addClass("is-invalid");
                heightInputinch.popover("show");
            }
            else {
                heightValue = (heightValuefeet * 12) + heightValueinch;
                bmi = (weightValue / (heightValue ** 2)) * 703.0695796;
                resultValue.html("<strong>" + bmi.toFixed(2) + "</strong>");
                bmiCategory.html("<strong>" + getbmiCategory(bmi.toFixed(2)) + "</strong>");
                weightInput.removeClass("is-invalid");
                weightInput.popover("hide");
                heightInputfeet.removeClass("is-invalid");
                heightInputfeet.popover("hide");
                heightInputinch.removeClass("is-invalid");
                heightInputinch.popover("hide");

            }
        }
    });


    function getbmiCategory(bmi) {

        if (bmi < 18.5) {
            resultValue.css("color", "#7091F5");
            bmiCategory.css("color", "#7091F5");
            bmiImage.removeClass("dis");
            bmiImage.attr("src", "images/Under Weight.png");

            $("#bmi-sugg").html("<strong>Suggestions for underweight individuals:</strong>" +
                "<ol><li>Eat nutrient-dense foods to increase calorie intake.</li>" +
                "<li>Include healthy fats in your diet like avocados, nuts, and olive oil.</li>" +
                "<li>Consume protein-rich foods like lean meats, poultry, and legumes.</li>" +
                "<li>Focus on strength training exercises to build muscle mass.</li>" +
                "<li>Consult a healthcare professional for personalized guidance.</li></ol>");

            return "Under Weight";
        }
        else if (bmi >= 18.5 && bmi < 25) {
            resultValue.css("color", "green");
            bmiCategory.css("color", "green");
            bmiImage.removeClass("dis");
            bmiImage.attr("src", "images/Normal Weight.png");

            $("#bmi-sugg").html("<strong>Suggestions for individuals with normal weight:</strong>" +
                "<ol><li>Continue to eat a balanced diet with a variety of foods.</li>" +
                "<li>Engage in regular physical activity and exercise.</li>" +
                "<li>Monitor your weight and adjust your habits as needed.</li>" +
                "<li>Prioritize stress management and get enough sleep.</li>" +
                "<li>Stay hydrated and make healthy lifestyle choices.</li></ol>");

            return "Normal Weight";
        }
        else if (bmi >= 25 && bmi < 30) {
            resultValue.css("color", "#FF2171");
            bmiCategory.css("color", "#FF2171");
            bmiImage.removeClass("dis");
            bmiImage.attr("src", "images/Over Weight.png");

            $("#bmi-sugg").html("<strong>Suggestions for overweight individuals:</strong>" +
                "<ol><li>Focus on portion control and balanced meals.</li>" +
                "<li>Increase your physical activity level and aim for regular exercise.</li>" +
                "<li>Include more fruits, vegetables, and whole grains in your diet.</li>" +
                "<li>Limit consumption of sugary and processed foods.</li>" +
                "<li>Consider working with a registered dietitian for guidance.</li></ol>");

            return "Over Weight";
        }
        else if (bmi >= 30 && bmi < 35) {
            resultValue.css("color", "#F86F03");
            bmiCategory.css("color", "#F86F03");
            bmiImage.removeClass("dis");
            bmiImage.attr("src", "images/Obesity Class 1.png");

            $("#bmi-sugg").html("<strong>Suggestions for individuals with Obesity class 1:</strong>" +
                "<ol><li>Adopt a balanced and sustainable diet plan.</li>" +
                "<li>Focus on portion control and mindful eating.</li>" +
                "<li>Engage in regular cardiovascular exercises like walking, jogging, or swimming.</li>" +
                "<li>Incorporate strength training exercises to build muscle mass.</li>" +
                "<li>Consult a healthcare professional for a personalized weight loss plan.</ol>");

            return "Obesity class 1";
        }
        else if (bmi >= 35 && bmi < 40) {
            resultValue.css("color", "#F24C3D");
            bmiCategory.css("color", "#F24C3D");
            bmiImage.removeClass("dis");
            bmiImage.attr("src", "images/Obesity Class 2.png");

            $("#bmi-sugg").html("<strong>Suggestions for individuals with Obesity class 2:</strong>" +
                "<ol><li>Consult a healthcare professional or registered dietitian for a personalized weight loss plan.</li>" +
                "<li>Focus on a well-balanced diet that includes plenty of fruits, vegetables, lean proteins, and whole grains.</li>" +
                "<li>Engage in regular physical activity, including both cardiovascular exercises and strength training.</li>" +
                "<li>Monitor your progress and make gradual changes to your lifestyle for long-term success.</li>" +
                "<li>Consider joining a support group or seeking professional guidance for sustainable weight management.</ol>");

            return "Obesity class 2";
        }
        else {
            resultValue.css("color", "#B31312");
            bmiCategory.css("color", "#B31312");
            bmiImage.removeClass("dis");
            bmiImage.attr("src", "images/Obesity Class 3.png");

            $("#bmi-sugg").html("<strong>Suggestions for individuals with Obesity class 3:</strong>" +
                "<ol><li>Seek immediate medical attention and consult a healthcare professional for comprehensive evaluation and guidance.</li>" +
                "<li>Consider medically supervised weight loss programs or bariatric surgery options if recommended by a healthcare provider.</li>" +
                "<li>Focus on making significant lifestyle changes under the supervision of a medical team.</li>" +
                "<li>Develop a personalized plan that includes dietary modifications, regular physical activity, and behavioral counseling.</li>" +
                "<li>Prioritize your overall health and well-being, and work closely with healthcare professionals to achieve sustainable results.</li></ol>");

            return "Obesity class 3";
        }

    }


    weightInput.focus(function () {
        weightInput.removeClass("is-invalid");
        weightInput.popover("hide");
    });

    heightInput.focus(function () {
        heightInput.removeClass("is-invalid");
        heightInput.popover("hide");
    });

    heightInputfeet.focus(function () {
        heightInputfeet.removeClass("is-invalid");
        heightInputfeet.popover("hide");
    });

    heightInputinch.focus(function () {
        heightInputinch.removeClass("is-invalid");
        heightInputinch.popover("hide");
    });

});