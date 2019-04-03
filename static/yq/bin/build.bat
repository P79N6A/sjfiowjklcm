@echo off
echo "========正在打包成静态资源文件======="

call npm --prefix ../ run build:prod


call release.bat