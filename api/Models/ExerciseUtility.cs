using api.Models;
namespace api.Models

{
    public class ExerciseUtility
    {
        public List<Exercise> GetAllExercises (){
            //Create a list of exercises:
            List<Exercise> exerciseList = new List<Exercise>();
            //Add some exercises to the List for dummy data:
            exerciseList.Add(new Exercise(){id = "1", activityName = "Hiking by Lake Nicol", activityType = "Hiking", distance = 3, pinned = false, deleted = false});
            exerciseList.Add(new Exercise(){id = "2", activityName = "Biking by Riverwalk", activityType = "Biking", distance = 5, pinned = false, deleted = false});
            return exerciseList;
        }
    }
}