using api.Models;
using System.Data.SQLite;

namespace api.Models

{
    public class ExerciseUtility
    {
        // Used for GET (all) request-------------------
        public List<Exercise> GetAllExercises (){
            //Create a list of exercises:
            List<Exercise> exerciseList = new List<Exercise>();
            // //Add some exercises to the List for dummy data:
            // exerciseList.Add(new Exercise(){id = "1", activityName = "Hiking by Lake Nicol", activityType = "Hiking", distance = 3, dateCompleted = "10/20/2023", pinned = false, deleted = false});
            // exerciseList.Add(new Exercise(){id = "2", activityName = "Biking by Riverwalk", activityType = "Biking", distance = 5, dateCompleted = "10/30/2023", pinned = false, deleted = false});
            string cs = @"URI=file:C:\Users\uyenk\OneDrive - The University of Alabama\JS\Uyen-Truong-TideFit-App\api\Database.db"; 
            using var con = new SQLiteConnection(cs); 
            con.Open(); 
                string stm = "SELECT * FROM Exercise"; 
                using var cmd = new SQLiteCommand(stm, con); 
                using SQLiteDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read()) {
                    Exercise exercise = new Exercise(){id=rdr.GetString(0), activityName = rdr.GetString(1), activityType = rdr.GetString(2),distance = rdr.GetInt32(3), dateCompleted = rdr.GetString(4), pinned = Convert.ToBoolean(rdr.GetInt32(5)), deleted = Convert.ToBoolean(rdr.GetInt32(6))};
                    exerciseList.Add(exercise);
                }
            con.Close();
            return exerciseList;
        }

        // Used for POST request-------------------------
        public void SaveExercise (Exercise exercise) {
            string cs = @"URI=file:C:\Users\uyenk\OneDrive - The University of Alabama\JS\Uyen-Truong-TideFit-App\api\Database.db";
            using var con = new SQLiteConnection (cs);
            con.Open();
            using var cmd = new SQLiteCommand(con);
            // Adding data to table:
            cmd.CommandText = @"INSERT INTO Exercise(id, activityName, activityType, distance, dateCompleted, pinned, deleted) 
            VALUES(@id, @activityName, @activityType, @distance, @dateCompleted, @pinned, @deleted)";
            cmd.Parameters.AddWithValue("@id",exercise.id);
            cmd.Parameters.AddWithValue("@activityName",exercise.activityName);
            cmd.Parameters.AddWithValue("@activityType",exercise.activityType);
            cmd.Parameters.AddWithValue("@distance",exercise.distance);
            cmd.Parameters.AddWithValue("@dateCompleted",exercise.dateCompleted);
            cmd.Parameters.AddWithValue("@pinned",exercise.pinned);
            cmd.Parameters.AddWithValue("@deleted",exercise.deleted);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close();
        }

        // Used for PUT request------------------------------
        public void UpdateExercise (Exercise exercise) {
            string cs = @"URI=file:C:\Users\uyenk\OneDrive - The University of Alabama\JS\Uyen-Truong-TideFit-App\api\Database.db";
            using var con = new SQLiteConnection (cs);
            con.Open();
            using var cmd = new SQLiteCommand(con);
            // Updating the data in the table where id= exercise.id:
            cmd.CommandText = @"UPDATE Exercise SET activityName = @activityName, activityType = @activityType, distance = @distance, dateCompleted = @dateCompleted, pinned = @pinned, deleted = @deleted
                                WHERE id = @id";
            cmd.Parameters.AddWithValue("@id",exercise.id);
            cmd.Parameters.AddWithValue("@activityName",exercise.activityName);
            cmd.Parameters.AddWithValue("@activityType",exercise.activityType);
            cmd.Parameters.AddWithValue("@distance",exercise.distance);
            cmd.Parameters.AddWithValue("@dateCompleted",exercise.dateCompleted);
            cmd.Parameters.AddWithValue("@pinned",exercise.pinned);
            cmd.Parameters.AddWithValue("@deleted",exercise.deleted);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
            con.Close(); 
        }
    }
}