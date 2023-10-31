using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        // GET: api/Exercise
        [HttpGet]
        public List<Exercise> Get()
        {   
            ExerciseUtility utility = new ExerciseUtility();
            List<Exercise> exerciseList= utility.GetAllExercises();
            return exerciseList;
        }

        // GET: api/Exercise/5
        [HttpGet("{id}", Name = "Get")]
        public Exercise Get(string id)
        {
            ExerciseUtility utility = new ExerciseUtility();
            List<Exercise> exerciseList = utility.GetAllExercises();
            foreach (Exercise exercise in exerciseList) {
                if (exercise.id == id) {
                    return exercise;
                }
            }
            return new Exercise();
        }

        // POST: api/Exercise
        [HttpPost]
        public void Post([FromBody] Exercise value)
        {   
            ExerciseUtility utility = new ExerciseUtility();
            utility.SaveExercise(value);
            // System.Console.WriteLine(value.activityName);
        }

        // PUT: api/Exercise/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] Exercise value)
        {
            ExerciseUtility utility = new ExerciseUtility();
            utility.UpdateExercise(value);
        }

        // DELETE: api/Exercise/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            System.Console.WriteLine(id);
        }
    }
}
