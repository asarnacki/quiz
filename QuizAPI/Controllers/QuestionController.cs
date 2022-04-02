using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuestionController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Questions>>> GetQuestions()
        {
            var randomQuestions = await (_context.Questions.Select(x => new
            {
                QuestionID = x.QuestionID,
                Question = x.Question,
                ImageName = x.ImageName,
                Options = new string[]
                 {
                    x.Option1,
                    x.Option2,
                    x.Option3,
                    x.Option4,
                 }
            }).OrderBy(y => Guid.NewGuid()).Take(5).ToListAsync());

            return Ok(randomQuestions);
        }

        // GET: api/Question/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Questions>> GetQuestionModel(int id)
        {
            var questionModel = await _context.Questions.FindAsync(id);

            if (questionModel == null)
            {
                return NotFound();
            }

            return questionModel;
        }

        // PUT: api/Question/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestionModel(int id, Questions questionModel)
        {
            if (id != questionModel.QuestionID)
            {
                return BadRequest();
            }

            _context.Entry(questionModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Question
        // To protect from overposting attacks, see https://go.micrRETURN osoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("GetAnswers")]
        public async Task<ActionResult<Questions>> ReteriveAnswers(int[] qnIDs)
        {
            var answers = await _context.Questions.Where(x => qnIDs.Contains(x.QuestionID))
                 .Select(y => new
            {
                QuestionID = y.QuestionID,
                Question = y.Question,
                ImageName = y.ImageName,
                
                Options = new string[] 
                {
                    y.Option1,
                    y.Option2,
                    y.Option3,   
                    y.Option4,
                    
                },
                Answer = y.Answer,
                 }).ToListAsync();
            return Ok(answers);
        }


        // DELETE: api/Question/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestionModel(int id)
        {
            var questionModel = await _context.Questions.FindAsync(id);
            if (questionModel == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(questionModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionModelExists(int id)
        {
            return _context.Questions.Any(e => e.QuestionID == id);
        }
    }
}
