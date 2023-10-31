
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

// Function: ASYNC PUT to update an exercise:
async function updateExercise(exercise) {
    await fetch ('http://localhost:5165/api/Exercise' + `/${exercise.id}`, {
        method: "PUT",
        body: JSON.stringify(exercise),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

// // Function: Selection Sort exercises (NO PINNED):
function selectionSortExercises(exerciseList){
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

function sortExercises(exerciseList) {
    // First, separate pinned and unpinned exercises
    const pinnedExercises = exerciseList.filter(exercise => exercise.pinned);
    const unpinnedExercises = exerciseList.filter(exercise => !exercise.pinned);

    // Sort both pinned and unpinned exercises by dateCompleted (latest to earliest)
    selectionSortExercises(pinnedExercises);
    selectionSortExercises(unpinnedExercises);

    // Concatenate the sorted pinned and unpinned exercises
    const sortedExercises = [...pinnedExercises, ...unpinnedExercises];

    // Update the original exerciseList with the sorted list
    exerciseList.length = 0; // Clear the original array
    exerciseList.push(...sortedExercises); // Push sorted exercises back to the original array
}

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
        // POST the new exercise to the API THEN re-render the Exercises:
        saveExercise(exercise).then (()=> {
            renderExercises();
        })
        // Reset form after submitting:
        document.getElementById("add-new-form").reset();
    });
    
}

// Function: Handle delete button:
function handleDeleteButton(exercise) {
    let deleteButton=document.querySelector(`#deleteButton-${exercise.id}`);
    deleteButton.addEventListener('click',() => {
        // soft delete: update the deleted field to "true"
        exercise.deleted = true;
        // update the change in the database THEN re-render the Exercises:
        updateExercise(exercise).then(()=> {
            renderExercises();
        })
    });
}

// // Function: Handle pin button:
// function handlePinButton(exercise) {
//     let pinButton=document.querySelector(`#pinButton-${exercise.id}`);
//     pinButton.addEventListener('click',() => {
//         // update pinned field to "true"
//         exercise.pinned = true;
//         // update the change in the database THEN re-render the Exercises:
//         updateExercise(exercise).then(()=> {
//             renderExercises();
//         })
//     }); 
// }

// function handlePinButton(exercise) {
//     let pinButton = document.querySelector(`#pinButton-${exercise.id}`);
    
//     // Check if the exercise is already pinned
//     if (exercise.pinned) {
//         // If it's already pinned, disable the button
//         pinButton.disabled = true;
//     } else {
//         // If it's not pinned, enable the button and add a click event listener
//         pinButton.disabled = false;
//         pinButton.addEventListener('click', () => {
//             // update pinned field to "true"
//             exercise.pinned = true;
//             // update the change in the database THEN re-render the Exercises:
//             updateExercise(exercise).then(() => {
//                 renderExercises();
//             });
//             // Disable the button after clicking to prevent multiple clicks
//             pinButton.disabled = true;
//         });
//     }
// }

function handlePinButton(exercise) {
    let pinButton = document.querySelector(`#pinButton-${exercise.id}`);
    
    // Check if the exercise is already pinned
    if (exercise.pinned) {
        // If it's already pinned, create an "Unpin" button
        pinButton.textContent = "Unpin";
        pinButton.disabled = false; // Enable the button  
        pinButton.addEventListener('click', () => {
            // update pinned field to "false"
            exercise.pinned = false;
            // update the change in the database THEN re-render the Exercises:
            updateExercise(exercise).then(() => {
                renderExercises();
            });
            // Disable the button after clicking to prevent multiple clicks
            pinButton.disabled = true;
        });
    } else {
        // If it's not pinned, create a "Pin" button
        pinButton.textContent = "Pin";
        pinButton.disabled = false; // Enable the button
        
        pinButton.addEventListener('click', () => {
            // update pinned field to "true"
            exercise.pinned = true;
            // update the change in the database THEN re-render the Exercises:
            updateExercise(exercise).then(() => {
                renderExercises();
            });
            // Disable the button after clicking to prevent multiple clicks
            pinButton.disabled = true;
        });
    }
}


// Function: Generate DOM for each new exercise:
function generateExerciseDOM(exercise) {
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
    handleDeleteButton(exercise);
    handlePinButton(exercise);
}

// Function: ASYNC function to render exercises
async function renderExercises() {
    let exerciseList= await fetchExerciseAPI();
    sortExercises(exerciseList);
    // clear DOM of the table:
    document.querySelector('#table-body').innerHTML="";
    // loop thru the list and add the rows into the table:
    exerciseList.forEach((exercise) => {
        if (!exercise.deleted){
            generateExerciseDOM(exercise);
        }
    });
}