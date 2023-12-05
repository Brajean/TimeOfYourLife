using Microsoft.AspNetCore.Mvc;
using time.Application.Models.Dtos;

namespace time.Application.Controllers;

[ApiController]
[Route("[controller]")]
public class ClockController : ControllerBase
{
    private static List<ClockPropsDto> _presets = new List<ClockPropsDto>(){ new() };

    private readonly ILogger<ClockController> _logger;

    public ClockController(ILogger<ClockController> logger)
    {
        _logger = logger;
    }

    [HttpGet, Route("presets")]
    public IEnumerable<ClockPropsDto> GetPresets()
    {
        return _presets.ToArray();
    }

    [HttpPost("presets")]
    public ClockPropsDto AddPreset([FromBody]ClockPropsDto preset)
    {
        _presets.Add(preset);
        return preset;
    }
}
