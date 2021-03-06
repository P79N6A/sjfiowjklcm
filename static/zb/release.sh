#/bin/sh

# 当前项目目录
base_dir=$(cd "$(dirname "$0")";pwd)

# 当前项目打包目录(看下是否要加dist目录)
dist_dir="${base_dir}/dist/"

# 当前用户目录
user_dir=$(eval echo ~${SUDO_USER})

# rsync 地址
rsync_dir="leo@206.161.250.12::bjhstatic";
rsync_test_dir="leo@206.161.250.12::bjhstatic";

run_sh="rsync -auvz --progress --delete  --password-file=${user_dir}/rsync.pwd ${dist_dir}  ${rsync_dir}  --exclude=*svn* --exclude=*properties*  --exclude=*.jar --exclude=*.jsp --exclude=*.class --exclude=*classes* --exclude=/WEB-INF --exclude=/payment --exclude=/META-INF --exclude=/commons --exclude=/tpl --exclude=/tpl --exclude=/node_modules"

# ========================================

echo ====start rsync  =====
PS3='Please enter your choice: '
    options=("更新到线上 1" "更新到测试 2" "Quit")
    select opt in "${options[@]}"
    do
        case $opt in
            "更新到线上(确认已通过测试!) 1")
                echo "you chose choice 1"
                rsync -auvz --progress --delete  --password-file=${user_dir}/rsync.pwd ${dist_dir}  ${rsync_dir}  --exclude=*svn* --exclude=*properties*  --exclude=*.jar --exclude=*.jsp --exclude=*.class --exclude=*classes* --exclude=/WEB-INF --exclude=/payment --exclude=/META-INF --exclude=/commons --exclude=/tpl --exclude=/tpl --exclude=/node_modules
                break
                ;;
            "更新到测试 2")
                echo "you chose choice 2"
                rsync -auvz --progress --delete  --password-file=${user_dir}/rsync.pwd ${dist_dir}  ${rsync_test_dir}  --exclude=*svn* --exclude=*properties*  --exclude=*.jar --exclude=*.jsp --exclude=*.class --exclude=*classes* --exclude=/WEB-INF --exclude=/payment --exclude=/META-INF --exclude=/commons --exclude=/tpl --exclude=/tpl --exclude=/node_modules
                break
                ;;
            "取消")
                break
                ;;
            *) echo invalid option;;
        esac
    done

echo ====end rsync  =====

