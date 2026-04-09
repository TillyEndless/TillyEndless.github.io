# Xiaoling Zhou's Homepage

Local development uses Homebrew `ruby@3.2` together with the helper scripts in [`bin/`](/Users/tilly/code/repository/TillyEndless.github.io/bin).

## Commands

```bash
./bin/setup
./bin/build
./bin/serve
```

`./bin/setup` installs gems into `local/bundle`, which is already ignored by Git. The build and serve scripts automatically use Homebrew Ruby 3.2, so they do not depend on the macOS system Ruby.
