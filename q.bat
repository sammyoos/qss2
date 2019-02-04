@echo off
start /b sass --watch --indented --color src:dst
start /b pug --watch --pretty --out=dst src
start /b tsc --build tsconfig.json --watch --pretty 
