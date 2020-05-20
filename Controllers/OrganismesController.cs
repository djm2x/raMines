using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webapp.Models;
using Microsoft.Data.SqlClient;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Webapp.Providers;

namespace Webapp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrganismesController : SuperController<Organisme>
    {
        public OrganismesController(AdminContext context) : base(context)
        { }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}")]
        public override async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir)
        {
            // int i = typeof(T).FullName.LastIndexOf('.');
            // string tableName = typeof(T).FullName.Substring(i + 1) + "s";

            var list = await _context.Organismes
                .OrderByName<Organisme>(sortBy, sortDir == "desc")
                .Skip(startIndex)
                .Take(pageSize)
                .Include(e=>e.Region)
                .ToListAsync()
                ;
            int count = await _context.Organismes.CountAsync();

            return Ok(new { list = list, count = count });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByForeignkey(int id)
        {
            return Ok(await _context.Organismes.Where(e => e.IdRegion == id).ToListAsync());
        }
    }
}