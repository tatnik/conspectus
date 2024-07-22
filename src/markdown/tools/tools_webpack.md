# Webpack

используется для компиляции JavaScript-модулей. Этот инструмент часто называют **бандлером** (от bundler) или **cборщиком модулей**. После его установки работать с ним можно, используя интерфейс командной строки или его API.

Webpack берёт всё, от чего зависит проект, и преобразует это в статические ресурсы, которые могут быть переданы клиенту.

## Установка

```
npm install --save-dev webpack
# или
npm install --save-dev webpack@<version>
```

## Настройка

Настройки могут принимать вид аргументов командной строки или присутствовать в проекте в виде конфигурационного файла с именем **webpack.config.js**. В нём нужно описать и экспортировать объект, содержащий настройки.

```js
{
entry: "./src/index.js",
mode: "development",
output: {
    filename: "./main.js"
  },
}
```

_entry_ задаёт главный файл с исходным кодом проекта

_mode_ указывает на тип окружения для компиляции

_output_ назначает файл, куда будет помещен резульата компиляции

## Настройка Webpack на работу с Babel

воспользуемся библиотекой babel-loader, которая позволит использовать Babel с Webpack. Babel при этом сможет перехватывать и обрабатывать файлы до их обработки Webpack.

### Правила для JS-файлов:

```js
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      },
    },
  ];
}
```

_rules_ - массив правил, в соответствии с которыми должен быть обработан файл, заданный регулярным выражением, описанным в свойстве _test_. В данном случае правило будет применяться ко всем файлам с расширениями .mjs и .js, за исключением файлов из папки node*modules. \_Use* указываем на необходимость использования babel-loader ( JS-файлы будут сначала обрабатываться средствами Babel, а потом упаковываться с помощью Webpack)

### Правила для CSS-файлов (добавляются в тот же массив _rules_)

```js
module: {
    rules: [
      {...},
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
    ]
  }
```

Cвойство _use_ может принимать массив объектов или строк.
Загрузчики вызываются, начиная с последнего, поэтому наши файлы сначала будут обработаны с помощью css-loader.
Cвойство modules=true объекта options приведет к тому, что CSS-стили будут применяться лишь к тем компонентам, в которые они импортированы. Css-loader разрешит команды импорта в CSS-файлах, после чего style-loader добавит то, что получится, в форме тега style, в разделе <head> страницы:

```html
<style>
  <-- наш css -->
</style>
```

### Правила обработки статических ресурсов:

```js
...
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }

...
```

### Настройка сервера разработки:

```
devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true
  },
```

Свойство _contentBase_ объекта с настройками _devServer_ указывает на папку, в которой расположены наши ресурсы и файл _index.html_.

Свойство _port_ позволяет задать порт, который будет прослушивать сервер.

Свойство _watchContentBase_ позволяет реализовать наблюдение за изменениями файлов в папке, задаваемой свойством _contentBase_

### Полный код файла webpack.config.js:

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: './main.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
```

[Источник](https://habr.com/ru/companies/ruvds/articles/436886/)

## Пример webpack.config.js для React-проекта, который использует SASS:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-plugin');

module.exports = {
entry: './src/index.js',
output: {
path: path.resolve(**dirname, 'dist'),
filename: 'bundle.js',
},
module: {
rules: [
{
test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devServer: {
    static: {
    directory: path.join(**dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
};
```

_entry_ - указывает точку входа для приложения (в данном случае ./src/index.js).

_output_ - определяет, где Webpack будет генерировать выходной файл (в данном случае ./dist/bundle.js).

_module.rules_ - определяет правила обработки различных типов файлов:

`test: /\.(js|jsx)$/` - обрабатывает файлы JavaScript и JSX.

`test: /\.s[ac]ss$/i` - обрабатывает файлы SASS/SCSS.

_resolve_ - указывает, какие расширения файлов Webpack должен искать при импорте модулей.

_plugins:_

_HtmlWebpackPlugin_ - генерирует HTML-файл, который включает в себя сгенерированный Webpack-ом JavaScript-код.

_MiniCssExtractPlugin_ - извлекает CSS-код в отдельный файл.

_devServer_ - настраивает сервер разработки Webpack.

Этот конфиг предполагает, что установлены следующие зависимости:

    webpack
    webpack-cli
    html-webpack-plugin
    mini-css-extract-plugin
    babel-loader
    @babel/core
    @babel/preset-env
    @babel/preset-react
    css-loader
    sass-loader
    sass

## Пример файла webpack.config.js для React-проекта с поддержкой TypeScript:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: './dist',
  },
};
```

### Основные моменты:

- Добавлен _resolve.extensions_ для поддержки TypeScript.

- Добавлен _module.rules_ для обработки _.tsx?_ файлов с помощью _ts-loader_.

- Добавлен _module.rules_ для обработки _.s[ac]ss_ файлов с помощью _style-loader, css-loader_ и *sass-loade*r.

- Добавлен _module.rules_ для обработки изображений и шрифтов с помощью _asset/resource_.

- Добавлен _plugins_ для генерации _index.html_ файла с помощью _html-webpack-plugin_.
