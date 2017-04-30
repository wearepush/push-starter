### Branches & Commits

When you want to make some contributions, start by making sure you have the most recent version of the 'upstream' development branch. To do this run the following commands:
```
# Takes you to your own local 'dev' branch:
git checkout dev

# Pulls updates:
git pull --rebase upstream dev
```

Now that we have the latest development version, we will create a branch from this to commit changes on:
```
git checkout -b branchType/branchName
```

Your branch should follow this naming convention:

* chore/...
    - work done on testing and build tools
* design/...
    - additions like psudo-code, PoC, or draft that is not yet in use
* doc/...
    - additions & improvements to the documentation
* feat/...
    - explicitly extends the functionality of the project
* fix/...
    - changes that address existing problems
* refactor/...
    - improvements to design patterns and other marginal changes
* test/...
    - general testing and QA development

Commits should be relevant to what its name implies. If you find yourself making unrelated changes, make a new branch, and merge changes from the last branch:
```
# Push your fork to github:
git push origin branchType/branchName

# Return to 'dev' branch:
git checkout dev

# Pull updates if there are any:
git pull --rebase upstream dev

# Create new branch:
git checkout -b newType/newName

# Pull updates from your last branch:
git pull --rebase origin branchType/branchName
```

### Commit Message Guidelines

The naming convention of commits mirrors that of branches:
```
[chore] ...

[design] ...

[doc] ...

[feat] ...

[fix] ...

[refactor] ...

[test] ...
```
