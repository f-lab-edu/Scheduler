// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

// __dirname, __filename을 ESM에서 사용하기 위한 처리
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // 진입점(엔트리)
  entry: './src/index.ts',

  // 출력 설정
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // 모듈을 해석(Resolve)할 때의 규칙
  resolve: {
    // import 시 확장자 처리
    extensions: ['.ts', '.js'],
    alias: { '@': path.resolve(__dirname, 'src') }, //별칭
  },
  //각 파일 유형별 로더(Loader) 규칙을 정의
  module: {
    rules: [
      // TypeScript -> JavaScript (babel-loader)
      {
        test: /\.ts$/,
        //적용 제외할 디렉토리나 파일
        exclude: /node_modules/,
        // 어떤 로더를 사용해서 처리할지
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
      // SCSS -> CSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 별도의 .css 파일로 추출
          'css-loader',
          'sass-loader',
        ],
      },
      // webpack5에서는 'file-loader' 필요 없음. 'asset/resource'로 대체 가능
      {
        // test: /\.(png|jpe?g|gif|svg)$/i,
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash].[ext]', // 빌드될 경로 및 파일명 패턴
        },
      },
    ],
  },

  //웹팩 빌드 과정 전체를 확장하거나 후처리하는 작업들을 수행
  plugins: [
    // CSS를 별도 파일로 추출
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', // 빌드 결과물로 dist 폴더에 들어갈 HTML 파일명
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
          globOptions: {
            ignore: ['**/index.html'], // index.html은 복사하지 않음
          },
        },
      ],
    }),
  ],

  optimization: {
    usedExports: true, //export를 식별-> 사용 않는 코드 제거
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, //콘솔 제거
          },
          format: {
            comments: false, //주석 제거
          },
        },
      }),
    ],
  },

  mode: 'production',
};
