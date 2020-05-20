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
    public class ProjetEnrsController : SuperController<ProjetEnr>
    {
        public ProjetEnrsController(AdminContext context) : base(context)
        {
        }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}/{idProvince}")]
        public async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir, int idProvince)
        {
            // int i = typeof(T).FullName.LastIndexOf('.');
            // string tableName = typeof(T).FullName.Substring(i + 1) + "s";

            var q = _context.ProjetEnrs
                // .Where(e => idProvince == 0 ? true : e.IdProvince == idProvince)
                .OrderByName<ProjetEnr>(sortBy, sortDir == "desc")
                ;

            int count = await q.CountAsync();

            var list = await q.Skip(startIndex)
                .Take(pageSize)
                .Include(e => e.Province)
                .Include(e => e.Commune)
                .Include(e => e.TypeProjet)
                .ToListAsync()
                ;

            return Ok(new { list = list, count = count });
        }

        [HttpGet("{idProvince}/{idCommune}/{annee}")]
        public async Task<IActionResult> GetForStatistique(int idProvince, int idCommune, int annee)
        {
            // int i = typeof(T).FullName.LastIndexOf('.');
            // string tableName = typeof(T).FullName.Substring(i + 1) + "s";

            var list = await _context.ProjetEnrs
                .Where(e => idProvince == 0 ? true : e.IdProvince == idProvince)
                .Where(e => idCommune == 0 ? true : e.IdCommune == idCommune)
                .Where(e => e.Date.Year == annee)
                .ToListAsync()
                ;

            return Ok(list);
        }

    }
}