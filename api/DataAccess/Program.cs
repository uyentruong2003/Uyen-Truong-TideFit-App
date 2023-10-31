using System.Data.SQLite;

string cs = @"URI=file:C:\Users\uyenk\OneDrive - The University of Alabama\JS\Uyen-Truong-TideFit-App\api\DataAccess\Database.db";

using var con = new SQLiteConnection (cs);
con.Open();
string stm = "select SQLITE_VERSION()";
using var cmd = new SQLiteCommand(stm, con);

// Adding data to table:
cmd.CommandText = @"INSERT INTO Exercise(id, activityName, activityType, distance, dateCompleted, pinned, deleted) 
VALUES(@id, @activityName, @activityType, @distance, @dateCompleted, @pinned, @deleted)";
cmd.Parameters.AddWithValue("@id","5");
cmd.Parameters.AddWithValue("@activityName","Gym at the REC");
cmd.Parameters.AddWithValue("@activityType","Treadmill");
cmd.Parameters.AddWithValue("@distance",3);
cmd.Parameters.AddWithValue("@dateCompleted","10/12/2023");
cmd.Parameters.AddWithValue("@pinned",false);
cmd.Parameters.AddWithValue("@deleted",true);

cmd.ExecuteNonQuery();
con.Close();

// Reading Data: copy codes

// put the reading data into getAllExercises in ExerciseUtility and then the ExerciseController GET request
// put the adding data into the addNewExercise(exercise/value) in the ExerciseUtility and then the ExerciseController POST request