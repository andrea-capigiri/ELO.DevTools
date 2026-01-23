using ELO.ID.API.Stuff;
using ELO.ID.Application.Models;
using ELO.ID.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace ELO.ID.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UtilityController : ControllerBase
    {
        [HttpPost("base64/encode")]
        public IActionResult Base64Encode([FromBody] StringRequest request)
        {
            if (string.IsNullOrEmpty(request.Value))
                return BadRequest("Value is required");

            var bytes = System.Text.Encoding.UTF8.GetBytes(request.Value);
            var encoded = Convert.ToBase64String(bytes);
            return Ok(new { result = encoded });
        }

        [HttpPost("base64/decode")]
        public IActionResult Base64Decode([FromBody] StringRequest request)
        {
            if (string.IsNullOrEmpty(request.Value))
                return BadRequest("Value is required");

            try
            {
                var bytes = Convert.FromBase64String(request.Value);
                var decoded = System.Text.Encoding.UTF8.GetString(bytes);
                return Ok(new { result = decoded });
            }
            catch (FormatException)
            {
                return BadRequest("Invalid Base64 string");
            }
        }

        [HttpGet("guid")]
        public IActionResult GenerateGuid([FromQuery] int count = 1)
        {
            if (count < 1 || count > 100)
                return BadRequest("Count must be between 1 and 100");

            var guids = Enumerable.Range(0, count)
                .Select(_ => Guid.NewGuid().ToString())
                .ToArray();

            return Ok(new { guids });
        }

        [HttpPost("url/encode")]
        public IActionResult UrlEncode([FromBody] StringRequest request)
        {
            if (string.IsNullOrEmpty(request.Value))
                return BadRequest("Value is required");

            var encoded = Uri.EscapeDataString(request.Value);
            return Ok(new { result = encoded });
        }

        [HttpPost("url/decode")]
        public IActionResult UrlDecode([FromBody] StringRequest request)
        {
            if (string.IsNullOrEmpty(request.Value))
                return BadRequest("Value is required");

            var decoded = Uri.UnescapeDataString(request.Value);
            return Ok(new { result = decoded });
        }
    }

    public record StringRequest(string Value);
}