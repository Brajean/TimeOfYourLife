using time.Domain.Entities.Base;

namespace time.Domain.Entities;

public class ClockPropsEntity : BaseEntity
{
  public string TitleHeader { get; set; }

  public string FontFamily {get; set;}
  
  public int TitleFontSize {get; set;}
  
  public int ClockFontSize {get ; set;}
  
  public bool BlinkColons {get; set;}
  
  public string TitleFontColor {get; set;}

  public string ClockFontColor {get; set;}
}
