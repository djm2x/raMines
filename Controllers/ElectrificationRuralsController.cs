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
    public class ElectrificationRuralsController : SuperController<ElectrificationRural>
    {
        public ElectrificationRuralsController(AdminContext context) : base(context)
        {
        }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}/{idRegion}/{idProvince}")]
        public async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir, int idRegion, int idProvince)
        {
            // int i = typeof(T).FullName.LastIndexOf('.');
            // string tableName = typeof(T).FullName.Substring(i + 1) + "s";

            var q = _context.ElectrificationRurals
                .Where(e => idProvince == 0 ? true : e.IdProvince == idProvince)
                .Where(e => idRegion == 0 ? true : e.Province.IdRegion == idRegion)
                .OrderByName<ElectrificationRural>(sortBy, sortDir == "desc")
                ;

            int count = await q.CountAsync();

            var list = await   q.Skip(startIndex)
                .Take(pageSize)
                .Include(e=>e.Province)
                .ToListAsync()
                ;

            return Ok(new { list = list, count = count });
        }

        
        [HttpGet()]
        public async Task<IActionResult> GetForStatistique()
        {
            var list = await _context.ElectrificationRurals.ToListAsync();

            var provinces = await _context.Provinces.ToListAsync();

            return Ok(new { list = list, provinces = provinces });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByForeignkey(int id)
        {
            return Ok(await _context.ElectrificationRurals.Where(e => e.IdProvince == id).ToListAsync());
        }

    }
}