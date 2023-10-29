
// Function: Save exercises to local storage:
const saveExercises = (exerciseList) => {
    localStorage.setItem('exercises',JSON.stringify(exerciseList))
}

// Function: Get saved exercises from local storage:
const getSavedExercises = () => {
        //get JSON notes from local storage
        const exercisesJSON = localStorage.getItem('exercises')
        // try-catch used just in case the file in local storage is not JSON
        try {
        // Check if not null, convert JSON back to array & return. 
        // Else, return empty array
        return exercisesJSON !== null ? JSON.parse(exercisesJSON) : []
        } catch(e){
            return []
    }
}

// Function: Remove an exercise:
const removeExercise = (id) => {
    let exerciseIndex = exerciseList.findIndex((exercise) => exercise.id === id);
    if (exerciseIndex > -1) {
        exerciseList.splice(exerciseIndex,1);
        saveExercises(exerciseList);
    } else {
        console.log("Exercise ID is not found.");
    }
}

// Function: Add new exercise:
function addNewExercise(exerciseList) {
    // Select Activity Type:
    let selectedType = "none"; 

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
            // dateCompleted: document.getElementById("dateCompletedDropdown").value,
            pinned: false,
            deleted: false
        };
        // Add the new exercise to the array & save to local storage:
        exerciseList.push(exercise);
        saveExercises(exerciseList);
        // Reset form after submitting:
        document.getElementById("add-new-form").reset();
    });
    
}


// Function: create HTML dom for  1 new exercise:
function generateExerciseDOM (exercise) {
    let imageURL = "";
    // pick the illustrated pic for the card:
    if (exercise.activityType === "Bike") {
        imageURL= "../client/resources/pilates.jpeg";
    } else if (exercise.activityType === "Run") {
        imageURL= "../client/resources/pilates.jpeg";
    } else if (exercise.activityType === "Hike") {
        imageURL= "../client/resources/pilates.jpeg";
    } else if (exercise.activityType === "Outdoor Walk") {
        imageURL= "../client/resources/pilates.jpeg";
    } else {
        imageURL= "../client/resources/pilates.jpeg";
    }
    // html to build the exercise's card
    const cardContent= `
    <div class="card mb-3" style="width: 700px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src=${imageURL} class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${exercise.activityName}</h5>
              <div class="card-text">
                <p>Activity Type: ${exercise.activityType}</p>
                <p>Distance (in Miles): ${exercise.distance}</p>
                <p>Date Completed: ${exercise.dateCompleted}</p>
              </div>
              <div>
                <button class="btn btn-primary" id="pinButton-${exercise.id}">Pin</button>
                <button class="btn btn-danger" id="deleteButton-${exercise.id}">Delete</button>
              </div>
            </div>
          </div>
        </div>
    </div>`;
    document.querySelector("#exercise-list-container").innerHTML = cardContent;

    //delete button handling
    document.querySelector(`#deleteButton-${exercise.id}`).addEventListener('click',(e) => {
        // remove exercise from local storage
        removeExercise(exercise.id);
        // get the updated list after removal
        exerciseList = getSavedExercises();
        // re-render th elist:
        renderExercises(exerciseList);
    })
}

function renderExercises(exerciseList) {
    const container = document.getElementById("exercise-list-container");
    container.innerHTML = ""; // Clear the container first
    exerciseList.forEach(exercise => {
        generateExerciseDOM(exercise);
    });
}

// function generateExerciseDOM(exercise) {
//     let imageURL = "";

//     // pick the illustrated pic for the card:
//     if (exercise.activityType === "Bike") {
//         imageURL = "../client/resources/pilates.jpeg";
//     } else if (exercise.activityType === "Run") {
//         imageURL = "../client/resources/pilates.jpeg";
//     } else if (exercise.activityType === "Hike") {
//         imageURL = "../client/resources/pilates.jpeg";
//     } else if (exercise.activityType === "Outdoor Walk") {
//         imageURL = "../client/resources/pilates.jpeg";
//     } else {
//         imageURL = "../client/resources/pilates.jpeg";
//     }

//     // HTML for the exercise card
//     const cardContent = `
//     <div class="card mb-3" style="width: 700px;">
//         <div class="row g-0">
//           <div class="col-md-4">
//             <img src=${imageURL} class="img-fluid rounded-start" alt="...">
//           </div>
//           <div class="col-md-8">
//             <div class="card-body">
//               <h5 class="card-title">${exercise.activityName}</h5>
//               <div class="card-text">
//                 <p>Activity Type: ${exercise.activityType}</p>
//                 <p>Distance (in Miles): ${exercise.distance}</p>
//                 <p>Date Completed: ${exercise.dateCompleted}</p>
//               </div>
//               <div>
//                 <button class="btn btn-primary" id="pinButton-${exercise.id}">Pin</button>
//                 <button class="btn btn-danger" id="deleteButton-${exercise.id}">Delete</button>
//               </div>
//             </div>
//           </div>
//         </div>
//     </div>`;

//     return cardContent; // Return the card content as a string
// }

// function renderExercises(exerciseList) {
//     const container = document.getElementById("exercise-list-container");
//     let allCardContent = ""; // Accumulate all card content

//     exerciseList.forEach(exercise => {
//         const cardContent = generateExerciseDOM(exercise);
//         allCardContent += cardContent; // Append each card's content
//         handleDeleteButton(exercise);
//     });

//     container.innerHTML = allCardContent; // Set the container's content once
    
// }

// function handleDeleteButton(exercise){
//     //delete button handling
//     document.querySelector(`#deleteButton-${exercise.id}`).addEventListener('click',(e) => {
//         // remove exercise from local storage
//         removeExercise(exercise.id);
//         // get the updated list after removal
//         exerciseList = getSavedExercises();
//         // re-render th elist:
//         renderExercises(exerciseList);
//     })
// }

//Function: sort a-z: