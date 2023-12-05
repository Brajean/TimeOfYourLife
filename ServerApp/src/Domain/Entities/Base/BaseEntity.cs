namespace time.Domain.Entities.Base;

public class BaseEntity
{
  public Guid Uuid { get; set; } = Guid.NewGuid();
}
