@echo off


:: rsync 目标地址
set rsync_target=leo@206.161.250.12::bjhstatic
set rsync_target_test=leo@206.161.250.12::bjhstatic

:: 当前路径
set cur_dir=%~dp0

:: 将当前路径转化为rsync格式的
set rsync_cur_dir=%cur_dir::\=/%
set rsync_cur_dir=/cygdrive/%rsync_cur_dir:\=/%

:: 本地打包部署路径
set source_dir=%rsync_cur_dir%/../dist/


:: 开始选择
:start
echo 选择推送地址
echo 1 线上环境(确认已通过测试!)
echo 2 测试环境
echo 3 取消提交
set choice=
set /p choice=请输入数字:
if not '%choice%'=='' set choice=%choice:~0,1%
if '%choice%'=='1' goto online
if '%choice%'=='2' goto test
if '%choice%'=='3' goto exit
echo "%choice%" 输入错误
echo.

goto start

:online
echo ====online====
rsync -auvz --progress --delete  --password-file=/cygdrive/c/rsyncd.secrets<c:/pwd.txt %source_dir%  %rsync_target%  --exclude=*svn* --exclude=*properties*  --exclude=*.jar --exclude=*.jsp --exclude=*.class --exclude=*classes* --exclude=/WEB-INF --exclude=/payment --exclude=/META-INF --exclude=/commons --exclude=/tpl
goto end

:test
echo ====test====
rsync -auvz --progress --delete  --password-file=/cygdrive/c/rsyncd.secrets<c:/pwd.txt %source_dir%  %rsync_target_test%  --exclude=*svn* --exclude=*properties*  --exclude=*.jar --exclude=*.jsp --exclude=*.class --exclude=*classes* --exclude=/WEB-INF --exclude=/payment --exclude=/META-INF --exclude=/commons --exclude=/tpl
goto end

:exit
echo ====exit====
goto end

:end
:: pause

