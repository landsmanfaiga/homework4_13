using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace homework4_11.Data
{
    public class PeopleRepo
    {
        private readonly string _connectionString;
        public PeopleRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void DeletePerson(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            Person p = context.People.FirstOrDefault(p => p.Id == id);
            context.People.Remove(p);
            context.SaveChanges();
        }

        public void EditPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            Person p = context.People.FirstOrDefault(p => p.Id == person.Id);
            p.FirstName = person.FirstName;
            p.LastName = person.LastName;
            p.Age = person.Age;
            context.SaveChanges();
        }

        public void DeletePeople(List<int> people)
        {
            foreach (int person in people)
            {
                DeletePerson(person);
            }
        }
    }
}
