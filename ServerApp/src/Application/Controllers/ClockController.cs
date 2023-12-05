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

    [HttpGet, Route("presets/{id:Guid}")]
    public ClockPropsDto GetPreset(Guid id)
    {
        var preset = _presets.FirstOrDefault(x => x.Uuid.Equals(id));
        if (preset == null)
        {
            _logger.LogError($"Preset with Uuid. {id} can not be founded.");
        }
        return preset;
    }

    [HttpPost("presets")]
    public ClockPropsDto AddPreset([FromBody]ClockPropsDto preset)
    {
        if (preset.Uuid == Guid.Empty)
        {
            _logger.LogError("Uuid can not be empty.");
            throw new Exception("Uuid can not be empty.");
        }

        if (string.IsNullOrEmpty(preset.TitleHeader))
        {
            _logger.LogError("TitleHeader can not be empty.");
            throw new Exception("Title Header  can not be empty.");
        }

        if (string.IsNullOrEmpty(preset.FontFamily))
        {
            _logger.LogError("FontFamily can not be empty.");
            throw new Exception("Font Family can not be empty.");
        }

        if (preset.TitleFontSize < 0)
        {
            _logger.LogError("TitleFontSize must be greather than 0.");
            throw new Exception("Title Font Size must be greather than 0.");
        }

        if (preset.ClockFontSize < 0)
        {
            _logger.LogError("ClockFontSize must be greather than 0.");
            throw new Exception("Clock Font Size must be greather than 0.");
        }

        if (string.IsNullOrEmpty(preset.TitleFontColor))
        {
            _logger.LogError("TitleFontColor can not be empty.");
            throw new Exception("Title Font Color can not be empty.");
        }

        if (string.IsNullOrEmpty(preset.ClockFontColor))
        {
            _logger.LogError("ClockFontColor can not be empty.");
            throw new Exception("Clock Font Color can not be empty.");
        }

        _presets.Add(preset);
        return preset;
    }
}
