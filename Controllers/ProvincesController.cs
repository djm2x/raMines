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
    public class ProvincesController : SuperController<Province>
    {
        public ProvincesController(AdminContext context) : base(context)
        {
            
        }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}")]
        public override async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir)
        {
            // int i = typeof(T).FullName.LastIndexOf('.');
            // string tableName = typeof(T).FullName.Substring(i + 1) + "s";

            var list = await _context.Provinces
                .OrderByName<Province>(sortBy, sortDir == "desc")
                .Skip(startIndex)
                .Take(pageSize)
                .Include(e=>e.Region)
                .ToListAsync()
                ;
            int count = await _context.Provinces.CountAsync();

            return Ok(new { list = list, count = count });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Province>>> GetByIdRegion(int id)
        {
            return Ok(await _context.Provinces.Where(e => e.IdRegion == id).ToListAsync());
        }

    }
}