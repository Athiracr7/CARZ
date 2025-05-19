namespace CarZ.Model
{
    public class Car
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Location { get; set; }
        public int OwnerId { get; set; }
        public int BookStatus { get; set; }
        public int bookedcustid { get; set; }
    }
}
