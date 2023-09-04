var model = null

var classes = ['Actinic Keratoses', 'Basal Cell Carcinoma', 'Benign Keratoses', 'Dermatofibroma', 'Melanoma', 'Melanocytic Nevus', 'Vascular Lesion']


define('servername','localhost'); 
define('serveruser','root'); 
define('serverpwd',''); 
define('dbname','nameofdb'); 
 
$connection = mysqli_connect(servername,serveruser,serverpwd,dbname) 
// Function to perform prediction on our Tensorflow JS Model

async function predict(){

    try {
        if(imgtag.src == ""){
            alert("Select an Image to Classify")
            return
        }

        let tensorImg = tf.browser.fromPixels(imgtag)
                        .resizeNearestNeighbor([75, 100])
                        .toFloat().expandDims();
        
        model.predict(tensorImg).data().then(
    function (prediction){
        let predicted_class = prediction.indexOf(Math.max(...prediction))


        console.log(classes[predicted_class])
        console.log(prediction) 

        prediction_text.innerHTML = classes[predicted_class]
        probability_text.innerHTML = Math.round(prediction[predicted_class] * 100) + "% Confidence"
    }
)
        
    }catch(error){
        alert("Error Classifying Image")
    }
}

// Function to Select our Image and Display it

function onFileSelected(event) {

    try {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        imgtag.title = selectedFile.name;

        reader.onload = function(event) {
            imgtag.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);
    }catch (error){
        alert("Error Reading Image")
    }
    
}

// Function to Select our Image and Display it

async function loadModel(){
    console.log("Loading Model")
    model = await tf.loadLayersModel('cnn_model/model.json')
    console.log("Loaded Model")

    loadingmodel.innerHTML = "Loaded ML Model"
    progressbar.style.display = "none"
}

loadModel()