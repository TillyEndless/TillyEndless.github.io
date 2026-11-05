# Xiaoling Zhou's Homepage

Personal academic website built with [al-folio v0.16.3](https://github.com/alshedivat/al-folio/tree/v0.16.3) and Jekyll 4. The original template's MIT license is in `LICENSE.al-folio`.

## Local development

Requires Homebrew `ruby@3.2`. Dependencies are installed in the ignored `local/bundle` directory.

```bash
./bin/setup
./bin/build
./bin/serve
```

## Content and customization

- `_pages/about.md`: biography, research interests, news, competitions, and awards.
- `_posts/`: blog articles. Existing URLs are retained as `/:categories/:title/`.
- `_bibliography/papers.bib`: publications shown at `/publications/`.
- `assets/img/profile.jpg`: current square profile photo; `images/profile.jpg` remains available at its existing URL.
- `files/cv.pdf`: CV, also reachable through `/cv/` and `/resume`.
- `_config.yml` and `_data/socials.yml`: site settings and contact details.
- `_sass/_custom.scss`: monochrome accents and profile sizing (270px desktop, 225px mobile).
- `assets/js/theme.js`: upstream theme switcher, with dark as the initial preference.

The native al-folio About, page, post, navigation, footer, and bibliography templates are used. The About title includes the Chinese name. The theme can be switched between light, dark, and system preferences using the navigation control.

## Deployment

GitHub Actions builds and deploys GitHub Pages from `codex/liweijiang-fullsite` using `.github/workflows/deploy.yml`. Pages must use **GitHub Actions** as its build source because al-folio's plugins are not supported by the legacy Pages builder. `Gemfile.lock` pins dependencies for macOS and Linux.

Research images, existing document downloads, and blog content are retained during the template migration.
