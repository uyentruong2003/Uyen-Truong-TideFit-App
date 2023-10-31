
// Function: POST exercises to API
async function saveExercise(exercise) {
    await fetch("http://localhost:5165/api/Exercise", {
        method: "POST",
        body: JSON.stringify(exercise),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

//Function: fetch all exercises from the API created:
async function fetchExerciseAPI() {
    try{
        const response = await fetch('http://localhost:5165/api/Exercise');
        if (!response.ok) {
            throw new error("Network response is not ok");
        }else {
            const data = await response.json();
            return data;
        }
    } catch (error){
        console.log(error);
    }
}

// // Function: Remove an exercise:
// const removeExercise = (id, exerciseList) => {
//     let exerciseIndex = exerciseList.findIndex((exercise) => exercise.id === id);
//     if (exerciseIndex > -1) {
//         exerciseList.splice(exerciseIndex,1);
//         saveExercises(exerciseList);
//         renderExercises(exerciseList);
//     } else {
//         console.log("Exercise ID is not found.");
//     }
// }

// Function: ASYNC DELETE exercise:
async function deleteExercise(id) {
    await fetch ('http://localhost:5165/api/Exercise' + '/' + id, {
        method: "DELETE",
        header: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

// Function: Selection Sort exercises:
function sortExercises(exerciseList){
    for(let i=0; i < exerciseList.length-1; i++){
        let latestIndex = i;
        for(let j=i+1; j< exerciseList.length; j++){
            if (exerciseList[j].dateCompleted > exerciseList[latestIndex].dateCompleted) {
                latestIndex = j;
            }
        }
        // Swap the current latest with the new latest exercise:
        if (latestIndex != i){
            let temp = exerciseList[i];
            exerciseList[i] = exerciseList[latestIndex];
            exerciseList[latestIndex] = temp;
        }
    }
};


// Function: Add new exercise:
function addNewExercise() {
    // Select Activity Type:
    let selectedType = "none"; 
    // Update the activity selector:
    document.querySelector('#activityTypeDropdown').addEventListener('change', (e) => {
        selectedType = e.target.value;
    });
    // Get the form inputs and plug them in the object exercise:
    document.querySelector('#add-new-form').addEventListener('submit', function (e) {
        e.preventDefault();
        // Create an object for the new exercise:
        let exercise = {
            id: uuidv4(),
            activityName: document.getElementById("activityNameInput").value,
            activityType: selectedType,
            distance: document.getElementById("distanceInput").value,
            dateCompleted: document.getElementById("dateCompleted").value,
            pinned: false,
            deleted: false
        };
        // POST the new exercise to the API:
        saveExercise(exercise);
        // Reset form after submitting:
        document.getElementById("add-new-form").reset();
        // Render exercise:
        renderExercises();
    });
    
}

// Function: Handle delete button:
function handleDeleteButton(id) {
    let deleteButton=document.querySelector(`#deleteButton-${id}`);
    deleteButton.addEventListener('click',() => {
        deleteExercise(id);
        renderExercises();
    });
}

// Function: Generate DOM for each new exercise:
function generateExerciseDOM(exercise, exerciseList) {
    // row content HTML:
    const rowContent = `
    <td>${exercise.activityName}</td>
    <td>${exercise.activityType}</td>
    <td>${exercise.distance}</td>
    <td>${exercise.dateCompleted}</td>
    <td>
        <button class="btn btn-primary" id="pinButton-${exercise.id}">Pin</button>
        <button class="btn btn-danger" id="deleteButton-${exercise.id}">Delete</button>
    </td>`
    // create a new row:
    const newRow = document.createElement('tr');
    // add the row content HTML into the new row:
    newRow.innerHTML= rowContent;
    // add the new row to the table:
    document.querySelector('#table-body').appendChild(newRow);
    handleDeleteButton(exercise.id);
}

// Function: ASYNC function to render exercises
async function renderExercises() {
    let exerciseList= await fetchExerciseAPI();
    sortExercises(exerciseList);
    // clear DOM of the table:
    document.querySelector('#table-body').innerHTML="";
    // loop thru the list and add the rows into the table:
    exerciseList.forEach((exercise) => {
        generateExerciseDOM(exercise, exerciseList);
    });
}