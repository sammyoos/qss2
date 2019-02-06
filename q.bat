@echo off
start /b sass --watch --indented --color src:docs
start /b pug --watch --pretty --out=docs src
start /b tsc --build tsconfig.json --watch --pretty 
