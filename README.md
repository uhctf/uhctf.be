# UHCTF website

**live version: https://uhctf.be**

# How to build locally

```
hugo serve
```

# How to make/push changes

Commit to `main`, GitHub Actions should build the site and push it to the FTP server.

**Note** the compilation uses `hugo minify`, which should take out comments  on the pages. So you 'should' be safe to use HTML style comments (as well as hugo comments `{{/* comment */}}`).
 