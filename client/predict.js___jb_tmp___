import {IMAGENET_CLASSES} from "./imagenet_classes.js";

$('#image-selector').change(function () {
    //Defining the filereader()
    let reader = new FileReader();

    //Initialization on Load of the Window.
    reader.onload = function () {
        let dataURL = reader.result;
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();
    };

    let file = $("#image-selector").prop('files')[0];

    //reading the file from file object
    reader.readAsDataURL(file);
});

// This Works
let model;

(async function loadModel() {
    console.log('Loading...');

    model = await tf.loadModel('http://127.0.0.1:81/tfjs-models/mobilenet/model.json');

    console.log('Model Loaded');

    $('.progress').hide();
})();

$('#predict-button').click(async function () {
    let image = $('#selected-image').get(0);
    let offset = tf.scalar(122.5);
    let tensor = tf.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .sub(offset)
        .div(offset)
        .expandDims();

    let predictions = await model.predict(tensor).data();
    let top5 = Array.from(predictions)
        .map(function (p, i) {
            return {
                probability: p,
                className: IMAGENET_CLASSES[i],
            };
        }).sort(function (a, b) {
            return b.probability - a.probability;
        }).slice(0, 5);

    $('#prediction-list').empty();

    top5.map(function (p, key) {
        $('#prediction-list').append(`
            <tr class="${key === 0 ? 'font-weight-bold' : ''}">
                <td style="width: 10px;">
                    ${key+1}.
                </td>
                <td class="text-capitalize">
                    ${p.className}
                </td>
                <td class="text-right">
                    ${p.probability.toFixed(6) * 100}%
                </td>
            </tr>
        `);
    });

    // top5.forEach(function (p) {
    //     $('#prediction-list').append(`<li class="nav-item">${p.className} : ${p.probability.toFixed(6)}</li>`)
    // });
});