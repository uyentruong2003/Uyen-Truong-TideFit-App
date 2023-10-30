namespace api.Models
{
    public class Exercise
    {
        public string id {get; set;}
        public string activityName {get; set;}
        public string activityType {get; set;}
        public int distance {get; set;}
        public string dateCompleted {get; set;}
        public bool pinned {get; set;}
        public bool deleted {get; set;}
        public override string ToString()
        {
            return $"{activityName} - {activityType} - {distance} - {dateCompleted}";
        }
    }
}