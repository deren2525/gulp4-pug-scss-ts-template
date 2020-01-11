

# gulp4-pug-scss-ts-template

<div align="center">

<img src="https://user-images.githubusercontent.com/32975158/72197680-4dd06400-3467-11ea-99eb-ca4075418484.jpg" alt="属性" title="タイトル">

</div>

> Pug × SCSS × TypeScript Template🐶 By gulp v4  
> （gulp v4 による Pug × SCSS × TypeScript テンプレート）

## 📦 Features
- Pug to HTML converter
- SCSS to CSS converter
- TypeScript to JavaScript converter
- Autoprefixer CSS 
- [Normalize.css](https://necolas.github.io/normalize.css/)

### Pug to HTML converter option
#### If you add _ to the beginning of the file name, it will not be converted to HTML.
> ex) _hogehoge.pug

#### Metadata is set in the following file.
> src > pug > include > _base.pug

### Directory structure

```
...
├─ gulpfile.ts
├─ src
│  ├─ pug
│  │  ├─ include
│  │  │  └─ _base.pug
│  │  └─ index.pug
│  ├─ scss
│  │  └─ style.scss
│  └─ typescript
│     └─ main.ts
└─ dist // What is automatically converted is stored here📦.
   └─ assets
      ├─ css
      │  └─ style.css
      ├─ js
      │  └─ main.js
      └─ index.html
```

## Recommend VSCode Extensions
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## 💬 Usage
### 0. How to set up gulp and Pug
If you've previously installed gulp globally, run `npm rm --global gulp` before following these instructions.  
For more information, read this [Sip](https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467).

1. Check for `node`, `npm`, and `npx`.  
If they are not installed, follow the instructions [here](https://nodejs.org/en/).

```
# Check for node
$ node -v
v12.14.0
```

```
# Check for npm
$ npm -v
6.13.4
```

```
# Check for npx
$ npx -v
6.13.4
```

2. Install the [gulp](https://gulpjs.com/) command line utility
```
$ npm install --global gulp-cli
```

3. Install the [pug](https://pugjs.org/api/getting-started.html) command line utility
```
$ npm install --global pug-cli
```

### 1. Install

```
$ git clone git@github.com:deren2525/gulp4-pug-scss-ts-template.git
$ cd gulp4-pug-scss-ts-template
$ npm install
```

Verify your gulp and pug versions
```
# Check for gulp
$ gulp -v
CLI version: 2.2.0
Local version: 4.0.2
```

```
# Check for pug
$ pug --version
pug version: 2.0.0-rc.4
pug-cli version: 1.0.0-alpha6
```

### 2. Start
```
# start
$ gulp
```
Go to [http://localhost:3000](http://localhost:3000/) !
