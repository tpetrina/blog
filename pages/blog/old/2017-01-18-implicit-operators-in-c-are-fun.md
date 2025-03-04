---
title: Implicit operators in C# are fun!
publishedAt: "2017-01-18"
---

Data conversion is boring, that is why people use AutoMapper. However, there is one other way for converting from one type to another - using implicit operator.

Consider:

```csharp
public class Entity
{
   public int Id { get; set; }
   public string Name { get; set; }
}

public class EntityDTO
{
   public int Id { get; set; }
   public string Name { get; set; }
}
```

If we want separate classes in different layers (think persistence, domain, DTOs, view models) mapping can be hard. However, using implicit operators we can get a little more safety than usual.

```csharp
public class EntityDTO
{
   public int Id { get; set; }
   public string Name { get; set; }

   public static implicit operator EntityDTO(Entity e)
      => new EntityDTO
      {
         Id = e.Id,
         Name = e.Name
      }
}
```

This allows us to write:

```csharp
var entity = context.Entities.Find(id);
EntityDTO dto = entity;
```

Is this fun? No. Is this easy? Again no.
But at least we are in some control of conversion and if we rename or add properties to the source class, we will get compile time errors.
