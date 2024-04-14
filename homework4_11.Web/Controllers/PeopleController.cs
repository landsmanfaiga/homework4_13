using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using homework4_11.Data;
using homework4_11.Web.Models;

namespace homework4_11.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepo(_connectionString);
            return repo.GetAll();
        }

        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.AddPerson(person);
        }

        [Route("editperson")]
        public void EditPerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.EditPerson(person);
        }

        [Route("deleteperson")]
        public void DeletePerson(DeletePeopleModel vm)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeletePerson(vm.Id);
        }

        [Route("deletepeople")]
        public void DeletePeople(DeletePeopleModel vm)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeletePeople(vm.People);
        }
    }
}
