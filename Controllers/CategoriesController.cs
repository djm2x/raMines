using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webapp.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Linq.Expressions;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Webapp.Providers;
using Microsoft.Extensions.Options;
using Helpers;

namespace Webapp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : SuperController<Categorie>
    {
        public CategoriesController(AdminContext context) : base(context)
        {
        }

       

    }
}