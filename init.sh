mkdir app

mkdir app/api

mkdir app/assets

mkdir app/scss

mkdir app/src

mkdir app/src/components

touch app/src/index.html

touch app/scss/style.scss

cp ./init_src/.gitignore ./.gitignore

cp ./init_src/main.js ./app/src/main.js

cp ./init_src/gulpfile.js ./gulpfile.js

cp ./init_src/reducer.js ./app/src/reducer.js

cp ./init_src/actions.js ./app/src/actions.js

cp ./init_src/api.php ./app/api/api.php

npm init

npm i gulp --save-dev

npm i --save-dev webpack webpack-cli webpack-stream

npm i @babel/core @babel/preset-env @babel/preset-react babel-loader --save-dev

npm i core-js --save

npm i gulp-sass --save-dev

npm i react react-dom --save-dev

npm i axios --save

npm i redux --save