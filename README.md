# UHCTF website

**live version at: https://uhctf.be**

# How to build locally

```
hugo serve
```

# How to make/push changes

Commit to `main`, GitHub Actions should build the site and push it to the FTP server.

**Note** the compilation uses `hugo minify`, which should take out comments  on the pages. So you 'should' be safe to use HTML style comments (as well as hugo comments `{{/* comment */}}`).
 

# Where's everything?

- To add or change a sponsor, add the sponsor to the sponsors file in `data/sponsors.yml` and add a logo to the `static/sponsors` folder.
- To change the site contents, change the file in `content`. You can simply copy-paste a markdown file to create a new page.
- Links in the top menu are located in `config.toml`
