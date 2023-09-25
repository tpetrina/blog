---
title: "Reset to previous migration with EF Core"
publishedAt: "2023-09-25"
summary: "Sometimes we need to revert the last applied migration to database. A small script can do this quickly"
tags: ["efcore", "csharp"]
---

When working with Entity Framework Core, migrations are iterated upon. Model is
changed, migrations are created and ran - only to realize a small mistake has
been made or an alteration is required. This is the normal inner-loop flow.

However, removing migration is easy if isn't applied - but with hot reload and
fast development, the migrations are applied and first need to be removed from
the database. Only then the generated migration files can be removed. This
method applies only to code-first approach.

> Note: Sometimes I create a migration just to see if there are any changes in
> the model that I forgot to create migrations for. These migrations are empty
> and need to be removed. Sadly, sometimes they are applied and EF remembers it.

The simplest way is to run `dotnet ef database update NAME_OF_PREV_MIGRATION`.
But to find out the name of the last migration, we first need to run the
`dotnet ef migrations list` and copy/paste it.

Depending on the setup, the above steps might need to reference the context (if
there is more than one). Or it might need to specify the migrations project. Or
it might need to specify any other parameters.

This calls for automation! Let's write a bash script.

First, let's build the app with `dotnet build`. After that, we can get the
current and the previous migration with the following steps:

```bash
PREV=`dotnet ef migrations list --context AppContext --no-build | tail -n2 | head -n1`
LAST=`dotnet ef migrations list --context AppContext --no-build | tail -n1`
```

A good rule of thumb is to ensure your scripts always print out what they are
doing - and in case they are destructive, they ask for confirmation. If possible,
add a dry run mode too.

```bash
# Cut timestamp out of the migration name
CURR=`echo $LAST | cut -d'_' -f 2`

echo "Migration '$PREV' will be restored"
echo "Migration '$CURR' will be removed"

# Ask for confirmation
read -p "Are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
fi
```

After confirming the undo, let's reset db and remove the migration:

```bash
echo "Reset database to $PREV migration"
dotnet ef database update -c AppContext $PREV --no-build

echo "Remove last migration"
dotnet ef migrations remove \
    --context AppContext \
    --project ../App.Migrations \
    --no-build
```

## Bonus: recreating the last migration

While in inner loop, you might want to simply recreate the current migration
after changing the model. To do that, simply add the following to the end:

```bash
echo "Rebuild '$CURR'"
dotnet ef migrations add $CURR \
    --context AppContext \
    --project ../App.Migrations
```

Using this version of the script, you can quickly rebuild migration and re-apply
it after a small tweak in the model.

## The full script

```bash
#!/bin/bash

dotnet build

PREV=`dotnet ef migrations list --context AppContext --no-build | tail -n2 | head -n1`
LAST=`dotnet ef migrations list --context AppContext --no-build | tail -n1`

# Cut timestamp out of the migration name
CURR=`echo $LAST | cut -d'_' -f 2`

echo "Migration '$PREV' will be restored"
echo "Migration '$CURR' will be removed and recreated"

# Ask for confirmation
read -p "Are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
fi

echo "Reset database to $PREV migration"
dotnet ef database update -c AppContext $PREV --no-build

echo "Remove last migration"
dotnet ef migrations remove \
    --context AppContext \
    --project ../App.Migrations \
    --no-build
```
