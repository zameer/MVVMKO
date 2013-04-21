using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KnockoutDemo.Models;

namespace KnockoutDemo.Controllers
{
    public class PersonController : Controller
    {
        //
        // GET: /Person/

        public ActionResult Index()
        {
            return View();
        }
        //
        // GET: /Person/
        public ActionResult NewPerson()
        {
            return View();
        }

        public string SavePeople(Person[] data)
        {
            //save customer data to database
            return "Data saved to database!";
        }

        public Person[] GetPeople()
        {
            SchoolEntities db = new SchoolEntities();
            var persons = from p in db.People
                         orderby p.PersonID
                         select p;
            return persons.ToArray();
        }

        public JsonResult Loading()
        {
            SchoolEntities db = new SchoolEntities();
            var persons = from p in db.People
                         orderby p.PersonID
                         select p;
            return Json(persons, JsonRequestBehavior.AllowGet);
        }
        public JsonResult RemovePerson(Person _Person)
        {
            Person id = _Person;
            string res = string.Empty;
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}
