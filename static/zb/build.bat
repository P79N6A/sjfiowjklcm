@echo off
echo "========���ڴ���ɾ�̬��Դ�ļ�======="

call npm --prefix ./ run build:prod
call npm --prefix ./manage/ run build:prod
call release.bat