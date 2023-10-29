using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        // GET: api/Exercise
        [HttpGet]
        public List<string> Get()
        {   
            List<string> myString = new List<string>();
            myString.Add("Hello World!");
            myString.Add("Dummy Data");
            return myString;
        }

        // GET: api/Exercise/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Exercise
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Exercise/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Exercise/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
