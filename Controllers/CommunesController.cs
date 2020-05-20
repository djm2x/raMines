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
using Webapp.Providers;
namespace Webapp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CommunesController : SuperController<Commune>
    {
        public CommunesController(AdminContext context) : base(context)
        {
            
        }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}")]
        public override async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir)
        {
            // int i = typeof(T).FullName.LastIndexOf('.');
            // string tableName = typeof(T).FullName.Substring(i + 1) + "s";

            var list = await _context.Communes
                .OrderByName<Commune>(sortBy, sortDir == "desc")
                .Skip(startIndex)
                .Take(pageSize)
                .Include(e=>e.Province)
                .Select(e=>new {
                    id=e.Id,
                    libelle=e.Libelle,
                    province = e.Province,
                    region = e.Province.Region
                })
                .ToListAsync()
                ;
            int count = await _context.Communes.CountAsync();

            return Ok(new { list = list, count = count });
        }

       

    }
}