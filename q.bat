@echo off
call sass --update --indented --color src:dst
call pug --pretty --out=dst src
call tsc --build tsconfig.json
