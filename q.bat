@echo off
call pug --pretty --out=dst src
call tsc --build tsconfig.json
