namespace time.Application.Models.Dtos;

public class ClockPropsDto
{
  public Guid Uuid { get; set; } = Guid.NewGuid();

  public string TitleHeader { get; set; } = "The Time of Your Life";

  public string FontFamily {get; set;} = "courier";
  
  public int[] AvailableFontSizes {get; }  = new[] { 12, 24, 48, 64 };
  
  public int TitleFontSize {get; set;} = 64;
  
  public int ClockFontSize {get ; set;} = 48;
  
  public bool BlinkColons {get; set;} = true;
  
  public string TitleFontColor {get; set;} = "black";

  public string ClockFontColor {get; set;} = "black";
}
